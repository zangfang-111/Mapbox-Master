import { useRef, FC, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { GeometryType } from '../home/utils';

// eslint-disable-next-line
// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// set mapbox accessToken
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

// generate random color for building floors
export const getRandomColor = () => {
  const toString = Math.floor(Math.random() * 16777215).toString(16);

  return '#' + toString.substring(0, 3);
};

interface MapContainerProps {
  lng: number;
  lat: number;
  zoom: number;
  setLng: (value: number) => void;
  setLat: (value: number) => void;
  setZoom: (value: number) => void;
  setLandArea: (value: number) => void;
  setBuildingArea: (value: number) => void;
  lotCoverage: number;
  floorNumber: number;
  floorHeight: number;
  geometry: GeometryType;
  renderType: 'click' | 'realTime';
  threeDFormat: boolean;
  styleFormat: string;
}

const MapContainer: FC<MapContainerProps> = ({
  lng,
  lat,
  zoom,
  setLng,
  setLat,
  setZoom,
  lotCoverage,
  floorNumber,
  floorHeight,
  setLandArea,
  setBuildingArea,
  geometry,
  renderType,
  threeDFormat,
  styleFormat,
}) => {
  // map container and map ref
  const mapRef = useRef<any>(null);
  const map = useRef<any>();

  useEffect(() => {
    // initialize map
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: `mapbox://styles/mapbox/${styleFormat}`,
      center: [lng, lat],
      zoom: zoom,
      pitch: 50,
      bearing: -17.6,
      antialias: true,
    });
  }, [geometry, styleFormat, threeDFormat]);

  useEffect(() => {
    // wait for map to initialize
    if (!map) return;

    // Add navigation control (the +/- zoom buttons)
    // map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // set lng, lat, zoom when move
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('style.load', () => {
      // Set the default atmosphere style
      map.current.setFog({});
    });

    // load plot with MultiPolygon
    map.current.on('load', () => {
      map.current.addSource('plot', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry,
        },
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: 'plot',
        type: 'fill',
        source: 'plot',
        layout: {},
        paint: {
          'fill-color': '#ccc',
          'fill-opacity': 0.8,
        },
      });

      // Add a black outline around the polygon.
      map.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'plot',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 2,
          'line-dasharray': [2, 1],
        },
      });
    });

    // 3d building format
    if (threeDFormat) {
      threeDBuildingFormat();
    }

    // set land area
    const area = turf.area(geometry);
    const roundedArea = Math.round(area * 100) / 100;
    setLandArea(roundedArea);

    // Clean up on unmount
    if (typeof map?.current !== 'undefined') {
      return () => map?.current?.remove();
    }
  }, [geometry, styleFormat, threeDFormat]);

  useEffect(() => {
    drawBuilding();
  }, [
    geometry,
    renderType,
    floorNumber,
    floorHeight,
    lotCoverage,
    styleFormat,
    threeDFormat,
  ]);

  const drawBuilding = () => {
    // validation before calculating scal with turf
    if (lotCoverage === 0) return;

    // polygon property generation
    const floors = Array.from(Array(floorNumber).keys());
    const mapped = floors.map((_, i) => ({
      [`floor_${i}_base_height`]: i * floorHeight,
      [`floor_${i}_height`]: (i + 1) * floorHeight,
    }));
    const property = Object.assign({}, ...mapped);

    // generate multiPolygon with turf
    const building = turf.multiPolygon(geometry.coordinates, property);
    const scaledBuilding = turf.transformScale(building, lotCoverage / 100);

    // set building area
    const area = turf.area(scaledBuilding);
    const roundedArea = Math.round(area * 100) / 100;
    setBuildingArea(roundedArea);

    // load scaled building polygon
    map.current.on('load', function () {
      map.current.addSource('building', {
        type: 'geojson',
        data: scaledBuilding,
      });

      for (let i = 0; i < mapped.length; i++) {
        const id = `floor_${i}`;
        const baseHeight = `floor_${i}_base_height`;
        const height = `floor_${i}_height`;

        map.current.addLayer({
          id,
          type: 'fill-extrusion',
          source: 'building',
          paint: {
            'fill-extrusion-color': getRandomColor(),
            'fill-extrusion-base': {
              type: 'identity',
              property: baseHeight,
            },
            'fill-extrusion-height': {
              type: 'identity',
              property: height,
            },
            'fill-extrusion-opacity': 0.5,
          },
        });
      }
    });

    // real time sync purpose:
    // set two types: click - performance purpose, realTime - real time sync
    if (renderType === 'click') {
      isClickEvent(scaledBuilding);
    } else {
      isEventListener(scaledBuilding);
    }
  };

  // sync when the map is clicked
  const isClickEvent = (data: any) => {
    map.current.on('click', () => {
      map.current.getSource('building').setData(data);
    });
  };

  // real time sync when the slider is updating
  const isEventListener = (data: any) => {
    const coverageSlider = document.getElementById('coverage-slider');
    const coverageInput = document.getElementById('coverage-input');
    const floorNumberSlider = document.getElementById('floor-number-slider');
    const floorNumberInput = document.getElementById('floor-number-input');
    const floorHeightSlider = document.getElementById('floor-height-slider');
    const floorHeightInput = document.getElementById('floor-height-input');

    coverageSlider?.addEventListener('click', () => {
      map.current.getSource('building').setData(data);
    });

    coverageInput?.addEventListener('change', () => {
      map.current.getSource('building').setData(data);
    });

    floorNumberSlider?.addEventListener('click', () => {
      map.current.getSource('building').setData(data);
    });

    floorNumberInput?.addEventListener('change', () => {
      map.current.getSource('building').setData(data);
    });

    floorHeightSlider?.addEventListener('click', () => {
      map.current.getSource('building').setData(data);
    });

    floorHeightInput?.addEventListener('change', () => {
      map.current.getSource('building').setData(data);
    });
  };

  // 3d building format
  const threeDBuildingFormat = () => {
    map.current.on('load', () => {
      // Insert the layer beneath any symbol layer
      const layers = map.current.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.current.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // add a smooth transition effect to the buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });
  };

  return (
    <div ref={mapRef} className="map-container" data-testid="map-container" />
  );
};

export default MapContainer;

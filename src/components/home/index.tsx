import React, { useState, useRef } from 'react';

import MapContainer from 'components/common/MapContainer';
import ControlPanel from './ControlPanel';
import Statistiques from './Statistiques';
import { corseauxGeometry, GeometryType } from './utils';
import { notification } from 'components/common/Toastify';

export const mapBoxStyles: string[] = [
  'light-v11',
  'streets-v12',
  'outdoors-v12',
  'dark-v11',
  'satellite-v9',
  'satellite-streets-v12',
  'navigation-day-v1',
  'navigation-night-v1',
];

// initial enum values
enum initial {
  INITIAL_LNG = 6.8245,
  INITIAL_LAT = 46.4691,
  INITIAL_ZOOM = 19,
  LOTCOVERAGE = 50,
  FLOORNUMBER = 3,
  FLOORHEIGHT = 10,
}

const Home = () => {
  // map initial props
  const [lng, setLng] = useState<number>(initial.INITIAL_LNG);
  const [lat, setLat] = useState<number>(initial.INITIAL_LAT);
  const [zoom, setZoom] = useState<number>(initial.INITIAL_ZOOM);

  // map advanced props
  const [renderType, setRenderType] = useState<'click' | 'realTime'>('click');
  const [styleFormat, setStyleFormat] = useState<string>(mapBoxStyles[0]);
  const [threeDFormat, setThreeDFormat] = useState<boolean>(false);

  // building states
  const [lotCoverage, setLotCoverage] = useState<number>(initial.LOTCOVERAGE);
  const [floorNumber, setFloorNumber] = useState<number>(initial.FLOORNUMBER);
  const [floorHeight, setFloorHeight] = useState<number>(initial.FLOORHEIGHT);

  // statistiques states
  const [landArea, setLandArea] = useState<number>(0);
  const [buildingArea, setBuildingArea] = useState<number>(0);

  // get geoJson from the uploaded file
  const [geometry, setSeoMetry] = useState<GeometryType>(corseauxGeometry);
  const [file, setFile] = useState<any>();
  const fileRef = useRef<any>(null);

  const isFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;

    const file = event.currentTarget.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (res) => {
      if (!res.target?.result) return;

      try {
        // @ts-ignore
        // TODO: types define correctly
        setSeoMetry(JSON.parse(res.target.result));
      } catch (err: any) {
        return notification('error', 'Please upload ".geojson" file!');
      }
    };
  };

  return (
    <div className="home">
      <ControlPanel
        lotCoverage={lotCoverage}
        floorNumber={floorNumber}
        floorHeight={floorHeight}
        setLotCoverage={setLotCoverage}
        setFloorNumber={setFloorNumber}
        setFloorHeight={setFloorHeight}
        renderType={renderType}
        styleFormat={styleFormat}
        threeDFormat={threeDFormat}
        setRenderType={setRenderType}
        setStyleFormat={setStyleFormat}
        setThreeDFormat={setThreeDFormat}
        file={file}
        fileRef={fileRef}
        isFileUpload={isFileUpload}
      />
      <Statistiques
        lng={lng}
        lat={lat}
        zoom={zoom}
        landArea={landArea}
        buildingArea={buildingArea}
        floorNumber={floorNumber}
        floorHeight={floorHeight}
      />
      <MapContainer
        lng={lng}
        lat={lat}
        zoom={zoom}
        setLng={setLng}
        setLat={setLat}
        setZoom={setZoom}
        lotCoverage={lotCoverage}
        floorNumber={floorNumber}
        floorHeight={floorHeight}
        setLandArea={setLandArea}
        setBuildingArea={setBuildingArea}
        geometry={geometry}
        renderType={renderType}
        threeDFormat={threeDFormat}
        styleFormat={styleFormat}
      />
    </div>
  );
};

export default Home;

import { FC } from 'react';

// statistiques props
interface StatistiquesProps {
  lng: number;
  lat: number;
  zoom: number;
  landArea: number;
  buildingArea: number;
  floorNumber: number;
  floorHeight: number;
}

const Statistiques: FC<StatistiquesProps> = ({
  lng,
  lat,
  zoom,
  landArea,
  buildingArea,
  floorNumber,
  floorHeight,
}) => {
  const buildingHeight = floorNumber * floorHeight;
  const volume = (buildingHeight * buildingArea).toFixed(2);
  const floorArea = (buildingArea * floorNumber).toFixed(2);

  return (
    <div className="statistiques" data-testid="statistiques">
      <h3>Statistiques</h3>
      <p>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </p>
      <p>Land Area(m2): {landArea}</p>
      <p>Building Area(m2): {buildingArea}</p>
      <p>Building Floor Area(m2): {floorArea}</p>
      <p>Volume(m3): {volume}</p>
      <p>Building Height(m): {buildingHeight}</p>
    </div>
  );
};

export default Statistiques;

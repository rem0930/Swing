import React from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';

const GoogleMapComponent = ({ latitude, longitude }) => {
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

  return (
    <Map
      center={position}
      zoom={15}
      mapId={mapId}
      style={{ width: '100%', height: '400px' }}
    >
      <Marker position={position} />
    </Map>
  );
};

export default GoogleMapComponent;

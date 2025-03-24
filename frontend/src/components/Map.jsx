import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import './Map.css';

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

function ClickableMap({ setLatLon }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatLon(lat, lng);
    },
  });
  return null;
}

function Map({ setLatLon, defaultLatLon }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (defaultLatLon?.lat && defaultLatLon?.lon) {
      setMarkerPosition([defaultLatLon.lat, defaultLatLon.lon]);
    }
  }, [defaultLatLon]);

  return (
    <div className='map'>
      {defaultLatLon ? (
        <MapContainer
          center={[defaultLatLon.lat, defaultLatLon.lon]}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickableMap setLatLon={(lat, lon) => {
            setMarkerPosition([lat, lon]);
            setLatLon(lat, lon);
          }} />
          {/* User-selected marker */}
          {markerPosition && <Marker position={markerPosition} />}
          {/* Original user location marker */}
          <Marker position={[defaultLatLon.lat, defaultLatLon.lon]} icon={redIcon} />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}

export default Map;


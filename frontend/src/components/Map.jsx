import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';

// Red Marker Icon for Current Location
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34] 
});

// Clickable Map Component to Update Marker Position
function ClickableMap({ setLatLon }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatLon(lat, lng); // Pass new location to App.jsx
    },
  });
  return null;
}

function Map({ setLatLon }) {
  const [markerPosition, setMarkerPosition] = useState([0, 0]); 
  const [position, setPosition] = useState(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setMarkerPosition([latitude, longitude]); 
          setPosition([latitude, longitude]); 
          setLatLon(latitude, longitude); // Send to App.jsx
        },
        (error) => console.error("❌ Geolocation error:", error)
      );
    }
  }, []);

  return (
    <div>
      {position ? (
        <MapContainer 
        center={position} 
        zoom={13} 
        style={{ 
          width: "40vw", 
          height: "80vh", 
          bottom: "670px", 
          left: "58%", 
          borderRadius: "40px"
        }}>
      
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickableMap setLatLon={(lat, lon) => {
            setMarkerPosition([lat, lon]);
            setLatLon(lat, lon);
          }} />
          {/* Markers */}
          {markerPosition && <Marker position={markerPosition} />}
          {position && <Marker position={position} icon={redIcon} />}
        </MapContainer>
      ) : (
        <p>Loading map...</p> // This ensures the map doesn't render before position is available
      )}
    </div>
  );
  
}

export default Map;

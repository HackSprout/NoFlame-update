import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import './Map.css';

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
      setLatLon(lat, lng);
    },
  });
  return null;
}

function Map({ setLatLon }) {
  const [position, setPosition] = useState(null);  // 🔹 Start with `null`
  const [markerPosition, setMarkerPosition] = useState(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setMarkerPosition([latitude, longitude]);
          setPosition([latitude, longitude]);
          setLatLon(latitude, longitude);
        },
        (error) => {
          console.error("❌ Geolocation error:", error);
          setPosition([37.7749, -122.4194]); // 🔹 Fallback to SF if location fails
        }
      );
    }
  }, []);

  return (
    <div className='map'>
      {position ? ( // ✅ Only render the map if the position is available
        <MapContainer 
          center={position} 
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
          {/* Markers */}
          {markerPosition && <Marker position={markerPosition} />}
          {position && <Marker position={position} icon={redIcon} />}
        </MapContainer>
      ) : (
        <p>Loading map...</p> // ✅ Shows a loading message until location is found
      )}
    </div>
  );
}

export default Map;

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

function LiveMap() {
  const [position, setPosition] = useState([12.9716, 77.5946]); // Bangalore

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(pos => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer center={position} zoom={15} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
}

export default LiveMap;

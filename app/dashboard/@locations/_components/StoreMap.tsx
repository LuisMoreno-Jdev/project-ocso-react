"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Componente auxiliar para mover la cámara del mapa
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15); // Mueve la cámara a la nueva posición con zoom 15
  }, [center, map]);
  return null;
}

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function StoreMap({ lat, lng, storeName }: { lat: number; lng: number; storeName: string }) {
  const position: [number, number] = [lat, lng];

  return (
    <div className="h-full w-full z-0 relative">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <ChangeView center={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>{storeName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
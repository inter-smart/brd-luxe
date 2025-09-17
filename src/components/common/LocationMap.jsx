"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const customIcon = new L.Icon({
  iconUrl: "/images/map-logo.svg",
  iconSize: [200, 75],
  iconAnchor: [100, 75],
  popupAnchor: [0, -60],
  className: "",
});

export default function LocationMap({position}) {
  console.log(position);
  
  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // light theme
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"  // dark theme
      />
      <Marker position={position} icon={customIcon}>
        <Popup>BRD Luxe Location</Popup>
      </Marker>
    </MapContainer>
  );
}

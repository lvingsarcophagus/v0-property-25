"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
})

export default function DynamicMap({ listings }: { listings: any[] }) {
  return (
    <MapContainer center={[40.7128, -74.006]} zoom={11} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {listings.map((listing) => (
        <Marker key={listing.id} position={[listing.lat, listing.lng]}>
          <Popup>{listing.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}


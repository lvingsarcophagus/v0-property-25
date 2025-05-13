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

const properties = [
  { id: 1, title: "Modern Apartment", lat: 40.7128, lng: -74.006, price: "$250,000" },
  { id: 2, title: "Cozy House", lat: 40.7282, lng: -73.7949, price: "$450,000" },
  { id: 3, title: "Luxury Condo", lat: 40.7589, lng: -73.9851, price: "$750,000" },
]

export default function Map() {
  return (
    <MapContainer center={[40.7128, -74.006]} zoom={11} style={{ height: "100%", width: "100%", position: "relative" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map((property) => (
        <Marker key={property.id} position={[property.lat, property.lng]}>
          <Popup>
            <div>
              <h3 className="font-semibold">{property.title}</h3>
              <p>{property.price}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}


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
  { id: 1, title: "Modern Apartment", lat: 54.8985, lng: 23.9036, price: "€150,000" },
  { id: 2, title: "Cozy House", lat: 54.9027, lng: 23.9096, price: "€250,000" },
  { id: 3, title: "Luxury Condo", lat: 54.8968, lng: 23.8813, price: "€350,000" },
]

export default function DynamicMapComponent() {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[54.8985, 23.9036]}
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
      >
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
    </div>
  )
}

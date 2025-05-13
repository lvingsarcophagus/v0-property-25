"use client"

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useTheme } from "next-themes"

// Sample property data
const properties = [
  { id: 1, title: "Modern Apartment", lat: 54.8985, lng: 23.9036, price: "€150,000" },
  { id: 2, title: "Cozy House", lat: 54.9027, lng: 23.9096, price: "€250,000" },
  { id: 3, title: "Luxury Condo", lat: 54.8968, lng: 23.8813, price: "€350,000" },
]

// Dark mode map style
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
]

export default function GoogleMapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { resolvedTheme } = useTheme()
  
  useEffect(() => {
    // Replace with your actual API key
    const apiKey = 'YOUR_API_KEY'
    const loader = new Loader({
      apiKey,
      version: 'weekly',
    })

    loader.load().then(() => {
      if (!mapRef.current) return
      
      // Create the map instance
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 54.8985, lng: 23.9036 },
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        styles: resolvedTheme === 'dark' ? darkMapStyle : [],
      })
      
      setMap(mapInstance)
      
      // Add markers for each property
      properties.forEach((property) => {
        const marker = new google.maps.Marker({
          position: { lat: property.lat, lng: property.lng },
          map: mapInstance,
          title: property.title,
        })
        
        // Add info window with themed content
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; color: ${resolvedTheme === 'dark' ? '#e5e7eb' : '#1f2937'}; background: ${resolvedTheme === 'dark' ? '#1f2937' : '#ffffff'};">
              <h3 style="font-weight: 600; margin-bottom: 4px;">${property.title}</h3>
              <p>${property.price}</p>
            </div>
          `,
        })
        
        marker.addListener('click', () => {
          infoWindow.open({
            anchor: marker,
            map: mapInstance,
          })
        })
      })
      
      setMapLoaded(true)
    })
  }, [resolvedTheme])
  
  // Update map theme when theme changes
  useEffect(() => {
    if (map) {
      map.setOptions({
        styles: resolvedTheme === 'dark' ? darkMapStyle : [],
      })
    }
  }, [resolvedTheme, map])

  return (
    <div className="map-container relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-md border border-border"
      />
      {!mapLoaded && (
        <div className="map-loader absolute inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}

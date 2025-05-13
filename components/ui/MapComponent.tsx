"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import the map components with no SSR
const MapWithNoSSR = dynamic(
  () => import("./DynamicMapComponent"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }
)

export default function MapComponent() {
  return <MapWithNoSSR />
}

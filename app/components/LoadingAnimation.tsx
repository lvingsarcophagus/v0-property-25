"use client"

import { useEffect, useState } from "react"
import { Home, Building, Key } from "lucide-react"

export default function LoadingAnimation() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 5
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute animate-ping">
          <Home className="h-16 w-16 text-primary/20" />
        </div>
        <div className="animate-bounce delay-75">
          <Building className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute animate-spin duration-3000">
          <Key className="h-8 w-8 text-primary/40" />
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-primary">PropertyFinder</h2>
      <p className="mb-6 text-muted-foreground">Loading your dream properties...</p>

      <div className="relative h-2 w-64 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
    </div>
  )
}


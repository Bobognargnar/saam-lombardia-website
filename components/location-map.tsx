"use client"

import { useEffect, useRef } from "react"

interface LocationMapProps {
  latitude: number
  longitude: number
  title?: string
  className?: string
}

export default function LocationMap({ latitude, longitude, title = "", className = "" }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        link.crossOrigin = ""
        document.head.appendChild(link)
      }

      // Add Leaflet JS
      if (!(window as any).L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        script.crossOrigin = ""
        document.head.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }
    }

    const initMap = async () => {
      await loadLeaflet()

      if (mapRef.current && !mapInstanceRef.current) {
        const L = (window as any).L

        // Use provided coordinates
        const coords = [latitude, longitude]

        // Create map instance
        mapInstanceRef.current = L.map(mapRef.current, { scrollWheelZoom: false }).setView(coords, 15)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstanceRef.current)

        // Add a marker
        const marker = L.marker(coords).addTo(mapInstanceRef.current)
        if (title) {
          marker.bindPopup(`<b>${title}</b>`).openPopup()
        }
      }
    }

    initMap()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude, title])

  return (
    <div className={`w-full h-full ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  )
}

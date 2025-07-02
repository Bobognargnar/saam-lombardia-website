"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default icon issue with Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

interface LocationMapProps {
  latitude: number
  longitude: number
  title: string
  className?: string
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude, title, className }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current)

      L.marker([latitude, longitude]).addTo(mapInstance.current).bindPopup(title).openPopup()
    } else if (mapInstance.current) {
      // If map already exists, just update its view and marker
      mapInstance.current.setView([latitude, longitude], 13)
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstance.current?.removeLayer(layer)
        }
      })
      L.marker([latitude, longitude]).addTo(mapInstance.current).bindPopup(title).openPopup()
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [latitude, longitude, title])

  return <div ref={mapRef} className={className} style={{ height: "100%", width: "100%" }} />
}

export default LocationMap

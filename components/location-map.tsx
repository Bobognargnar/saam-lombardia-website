"use client"

import { useEffect, useRef } from "react"

interface LocationMapProps {
  address: string
  className?: string
}

export default function LocationMap({ address, className = "" }: LocationMapProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      // Encode the address for the Google Maps URL
      const encodedAddress = encodeURIComponent(address)

      // Set the src attribute with the Google Maps embed URL
      iframeRef.current.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=15`

      // Note: In a real application, you would need to replace YOUR_API_KEY with an actual Google Maps API key
      // For this demo, we'll use a placeholder that shows what the iframe would look like
    }
  }, [address])

  return (
    <div className={`w-full h-full ${className}`}>
      {/* For demonstration purposes, we'll show a placeholder */}
      <div className="w-full h-full bg-forest-900 flex items-center justify-center text-center p-4">
        <div>
          <p className="text-forest-500 font-semibold mb-2">Google Maps</p>
          <p className="text-sm text-gray-300">{address}</p>
          <p className="text-xs text-gray-400 mt-2">
            (In a real application, this would display an interactive Google Map)
          </p>
        </div>
      </div>

      {/* This iframe would be used in a real application with a valid API key */}
      <iframe
        ref={iframeRef}
        className="hidden w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        title={`Map of ${address}`}
      ></iframe>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

interface VantaBackgroundProps {
  className?: string
}

export default function VantaBackground({ className = "" }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    // Load Three.js
    const threeScript = document.createElement("script")
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
    threeScript.async = true
    document.head.appendChild(threeScript)

    threeScript.onload = () => {
      // Load Vanta.js NET effect
      const vantaScript = document.createElement("script")
      vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
      vantaScript.async = true
      document.head.appendChild(vantaScript)

      vantaScript.onload = () => {
        if (vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x1f7d53, // forest-500 color
            backgroundColor: 0x18230f, // forest-900 color
            points: 8.0,
            maxDistance: 25.0,
            spacing: 18.0,
          })
        }
      }
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [])

  return <div ref={vantaRef} className={`absolute inset-0 ${className}`} />
}

"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script" // Import Script

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
  const [threeLoaded, setThreeLoaded] = useState(false)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  useEffect(() => {
    if (vantaRef.current && threeLoaded && vantaLoaded && window.VANTA && window.THREE) {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
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

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [threeLoaded, vantaLoaded]) // Dependencies on script load states

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive" // Load before React hydration
        onLoad={() => setThreeLoaded(true)}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="lazyOnload" // Load after page is interactive
        onLoad={() => setVantaLoaded(true)}
      />
      <div ref={vantaRef} className={`absolute inset-0 ${className}`} />
    </>
  )
}

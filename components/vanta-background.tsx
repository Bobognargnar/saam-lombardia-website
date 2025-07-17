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
    console.log("VantaBackground useEffect triggered", { threeLoaded, vantaLoaded, vantaRefCurrent: vantaRef.current })

    // Only attempt to initialize Vanta.js if both scripts are loaded and the ref is available
    if (vantaRef.current && threeLoaded && vantaLoaded && window.VANTA && window.THREE) {

      console.log("Initializing Vanta.js WAVES effect...")
      
      // Check if WebGL is supported
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        console.warn("WebGL not supported, falling back to static background")
        return
      }

      // Destroy existing effect if it exists to prevent multiple initializations
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
      try {
        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xa180b, // forest-500 color
          shininess: 30.0,
          waveHeight: 10.5,
          waveSpeed: 1.05,
          zoom: 1.5,
        })
      } catch (error) {
        console.error("Failed to initialize Vanta.js effect:", error)
      }
    } else {
      console.log(
        "Conditions not met for Vanta.js initialization. Three Loaded:",
        threeLoaded,
        "Vanta Loaded:",
        vantaLoaded,
        "Vanta Ref:",
        vantaRef.current,
      )
    }

    // Cleanup function to destroy the Vanta.js effect when the component unmounts
    return () => {
      console.log("VantaBackground cleanup...")
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null // Clear the ref
        console.log("Vanta.js effect destroyed.")
      }
    }
  }, [threeLoaded, vantaLoaded]) // Dependencies on script load states

  return (
    <>
      {/* Load Three.js script */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive" // Changed strategy to afterInteractive
        onLoad={() => {
          console.log("Three.js loaded successfully!")
          setThreeLoaded(true)
        }}
        onError={(e) => console.error("Failed to load Three.js:", e)}
      />
      {/* Load Vanta.js NET effect script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="afterInteractive" // Changed strategy to afterInteractive
        onLoad={() => {
          console.log("Vanta.js loaded successfully!")
          setVantaLoaded(true)
        }}
        onError={(e) => console.error("Failed to load Vanta.js:", e)}
      />
      <div ref={vantaRef} className={`absolute inset-0 bg-forest-900 ${className}`} />
    </>
  )
}

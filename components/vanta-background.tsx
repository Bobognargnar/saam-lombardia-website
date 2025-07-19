"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

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
  const [isMobile, setIsMobile] = useState(false)
  const [webGLSupported, setWebGLSupported] = useState(true)

  // Detect mobile devices and WebGL support
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ["android", "iphone", "ipad", "mobile", "tablet"]
      return (
        mobileKeywords.some((keyword) => userAgent.includes(keyword)) ||
        window.innerWidth <= 768 ||
        "ontouchstart" in window
      )
    }

    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (!gl) return false

        // Additional WebGL capability checks for mobile
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          // Some mobile GPUs have issues with complex WebGL effects
          if (renderer && renderer.toLowerCase().includes("adreno")) {
            console.log("Adreno GPU detected, may have WebGL limitations")
          }
        }

        return true
      } catch (e) {
        console.warn("WebGL check failed:", e)
        return false
      }
    }

    setIsMobile(checkMobile())
    setWebGLSupported(checkWebGL())
  }, [])

  useEffect(() => {
    console.log("VantaBackground useEffect triggered", {
      threeLoaded,
      vantaLoaded,
      isMobile,
      webGLSupported,
      vantaRefCurrent: vantaRef.current,
    })

    // Skip Vanta.js on mobile or if WebGL is not supported
    if (isMobile || !webGLSupported) {
      console.log("Skipping Vanta.js initialization:", { isMobile, webGLSupported })
      return
    }

    // Only attempt to initialize Vanta.js if both scripts are loaded and the ref is available
    if (vantaRef.current && threeLoaded && vantaLoaded && window.VANTA && window.THREE) {
      console.log("Initializing Vanta.js WAVES effect...")

      // Destroy existing effect if it exists to prevent multiple initializations
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }

      try {
        // Back to original WAVES effect
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
        console.log("Vanta.js WAVES effect initialized successfully")
      } catch (error) {
        console.error("Failed to initialize Vanta.js effect:", error)
      }
    } else {
      console.log(
        "Conditions not met for Vanta.js initialization. Three Loaded:",
        threeLoaded,
        "Vanta Loaded:",
        vantaLoaded,
        "Mobile:",
        isMobile,
        "WebGL:",
        webGLSupported,
        "Vanta Ref:",
        vantaRef.current,
      )
    }

    // Cleanup function to destroy the Vanta.js effect when the component unmounts
    return () => {
      console.log("VantaBackground cleanup...")
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
        console.log("Vanta.js effect destroyed.")
      }
    }
  }, [threeLoaded, vantaLoaded, isMobile, webGLSupported])

  // CSS gradient fallback for mobile or when WebGL is not supported
  const fallbackStyle =
    isMobile || !webGLSupported
      ? {
          background: `
      linear-gradient(135deg, 
        #18230f 0%, 
        #1f2f16 25%, 
        #1f7d53 50%, 
        #1f2f16 75%, 
        #18230f 100%
      )
    `,
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
        }
      : {}

  return (
    <>
      {/* Only load scripts if not on mobile and WebGL is supported */}
      {!isMobile && webGLSupported && (
        <>
          {/* Load Three.js script */}
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              console.log("Three.js loaded successfully!")
              setThreeLoaded(true)
            }}
            onError={(e) => console.error("Failed to load Three.js:", e)}
          />
          {/* Load Vanta.js WAVES effect script */}
          <Script
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              console.log("Vanta.js WAVES loaded successfully!")
              setVantaLoaded(true)
            }}
            onError={(e) => console.error("Failed to load Vanta.js WAVES:", e)}
          />
        </>
      )}

      <div ref={vantaRef} className={`absolute inset-0 bg-forest-900 ${className}`} style={fallbackStyle} />

      {/* Add CSS animation for gradient fallback */}
      {(isMobile || !webGLSupported) && (
        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      )}
    </>
  )
}

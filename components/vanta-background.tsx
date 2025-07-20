"use client"

import { useEffect, useRef, useState } from "react"

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
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
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
        return !!gl
      } catch (e) {
        console.warn("WebGL check failed:", e)
        return false
      }
    }

    setIsMobile(checkMobile())
    setWebGLSupported(checkWebGL())
  }, [])

  // Load scripts sequentially
  useEffect(() => {
    if (isMobile || !webGLSupported) {
      console.log("Skipping script loading for mobile or non-WebGL browser")
      return
    }

    const loadScriptsSequentially = async () => {
      try {
        console.log("Starting sequential script loading...")

        // Load Three.js first
        await new Promise<void>((resolve, reject) => {
          if (window.THREE) {
            console.log("Three.js already loaded")
            resolve()
            return
          }

          const threeScript = document.createElement("script")
          threeScript.src = "/js/three.min.js"
          threeScript.async = true
          threeScript.onload = () => {
            console.log("Three.js loaded successfully!")
            console.log("THREE available:", !!window.THREE)
            resolve()
          }
          threeScript.onerror = () => {
            console.error("Failed to load Three.js")
            reject(new Error("Failed to load Three.js"))
          }
          document.head.appendChild(threeScript)
        })

        // Wait a bit for Three.js to fully initialize
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Load Vanta.js WAVES effect (which includes the core)
        await new Promise<void>((resolve, reject) => {
          if (window.VANTA && window.VANTA.WAVES) {
            console.log("Vanta.js WAVES already loaded")
            resolve()
            return
          }

          const wavesScript = document.createElement("script")
          wavesScript.src = "/js/vanta.waves.min.js"
          wavesScript.async = true
          wavesScript.onload = () => {
            console.log("Vanta.js WAVES loaded successfully!")
            console.log("VANTA.WAVES available:", !!(window.VANTA && window.VANTA.WAVES))
            resolve()
          }
          wavesScript.onerror = () => {
            console.error("Failed to load Vanta.js WAVES")
            reject(new Error("Failed to load Vanta.js WAVES"))
          }
          document.head.appendChild(wavesScript)
        })

        console.log("All scripts loaded successfully!")
        setScriptsLoaded(true)
      } catch (error) {
        console.error("Error loading scripts:", error)
        // If all attempts fail, we'll use the CSS fallback
        console.log("Falling back to CSS gradient background")
        setScriptsLoaded(false)
      }
    }

    loadScriptsSequentially()
  }, [isMobile, webGLSupported])

  // Initialize Vanta.js effect
  useEffect(() => {
    if (!scriptsLoaded || isMobile || !webGLSupported || !vantaRef.current) {
      return
    }

    console.log("Attempting to initialize Vanta.js WAVES effect...")
    console.log("Available objects:", {
      THREE: !!window.THREE,
      VANTA: !!window.VANTA,
      WAVES: !!(window.VANTA && window.VANTA.WAVES),
      element: !!vantaRef.current,
    })

    // Additional delay to ensure everything is ready
    const initTimer = setTimeout(() => {
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
        console.log("Vanta.js WAVES effect initialized successfully!")
      } catch (error) {
        console.error("Failed to initialize Vanta.js effect:", error)
      }
    }, 300)

    return () => {
      clearTimeout(initTimer)
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
        console.log("Vanta.js effect destroyed.")
      }
    }
  }, [scriptsLoaded, isMobile, webGLSupported])

  // Simple background color fallback for mobile, when WebGL is not supported, or when scripts fail to load
  const fallbackStyle =
    isMobile || !webGLSupported || !scriptsLoaded
      ? {
          backgroundColor: "#18230f", // forest-900 color
        }
      : {}

  return (
    <>
      <div ref={vantaRef} className={`absolute inset-0 bg-forest-900 ${className}`} style={fallbackStyle} />


    </>
  )
}

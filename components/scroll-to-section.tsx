"use client"

import { useEffect } from "react"

export default function ScrollToSection() {
  useEffect(() => {
    // Function to handle smooth scrolling with offset for fixed header
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if the clicked element is an anchor with a hash
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        const href = target.getAttribute("href")
        if (!href) return

        const targetId = href.replace("#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          e.preventDefault()

          // Get header height to offset scroll position (add some extra padding)
          const header = document.querySelector("header")
          const headerHeight = header ? header.offsetHeight + 20 : 0

          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    }

    // Add event listener to document
    document.addEventListener("click", handleAnchorClick)

    // Clean up event listener
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}

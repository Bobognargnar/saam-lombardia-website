"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToSection() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes("#")) {
      const id = pathname.split("#")[1]
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [pathname])

  return null
}

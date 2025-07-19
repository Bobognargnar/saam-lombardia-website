import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SAAM Lombardia - Scuola Arti Marziali",
  description: "Scuola di Arti Marziali SAAM Lombardia - Corsi di arti marziali per tutte le età",
  verification: {
    google: "8I6jF-si9ixcT55N5Krdk150qSORCTXUW0rwxTS270c",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

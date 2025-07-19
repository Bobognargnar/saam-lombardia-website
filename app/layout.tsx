import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sala d'Arme Achille Marozzo Lombardia",
  description:
    "Associazione sportiva dilettantistica dedicata allo studio, alla pratica e alla diffusione delle arti marziali storiche italiane.",
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

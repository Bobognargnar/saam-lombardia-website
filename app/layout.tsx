import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sala D'Arme Achille Marozzo Lombardia - Arti Marziali Storiche Italiane",
  description: "Impara le basi della scherma storica in Lombardia - Uno sport di onore e amicizia",
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <head>
        <meta name="google-site-verification" content="8I6jF-si9ixcT55N5Krdk150qSORCTXUW0rwxTS270c" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

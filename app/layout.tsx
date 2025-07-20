import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SAAM Lombardia - Sala d'Arme Achille Marozzo | Corsi di Scherma Storica",
  description: "Scopri i corsi di scherma antica e medievale a Milano, Lecco, Cremona e Varese. Lezioni di prova gratuite con istruttori qualificati.",
  keywords: "scherma storica, scherma medievale, scherma rinascimentale, arti marziali italiane, Achille Marozzo, Milano, Lecco, Cremona, Varese, corsi scherma, spada storica",
  authors: [{ name: "SAAM Lombardia" }],
  creator: "SAAM Lombardia",
  publisher: "SAAM Lombardia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saam-lombardia.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SAAM Lombardia - Sala d'Arme Achille Marozzo",
    description: "Corsi di scherma antica e medievale a Milano, Lecco, Cremona e Varese",
    url: 'https://saam-lombardia.vercel.app',
    siteName: 'SAAM Lombardia',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SAAM Lombardia - Sala d'Arme Achille Marozzo",
    description: "Corsi di scherma antica e medievale a Milano, Lecco, Cremona e Varese",
  },
  verification: {
    google: "8I6jF-si9ixcT55N5Krdk150qSORCTXUW0rwxTS270c",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}

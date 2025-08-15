import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SAAM Lombardia - Sala d'Arme Achille Marozzo | Corsi di Scherma Storica",
  description: "Scopri i corsi di scherma antica e medievale a Milano, Lecco, Cremona e Varese. Lezioni di prova gratuite con istruttori qualificati.",
  keywords: "scherma storica, scherma medievale, scherma rinascimentale, arti marziali italiane, Achille Marozzo, Milano, Lecco, Cremona, Varese, corsi scherma, spada storica, scherma antica, duello storico, spada medievale, spada rinascimentale",
  authors: [{ name: "SAAM Lombardia" }],
  creator: "SAAM Lombardia",
  publisher: "SAAM Lombardia",
  category: "Arti Marziali",
  classification: "Sport e Ricreazione",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saam-lombardia.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'it-IT': '/',
    },
  },
  openGraph: {
    title: "SAAM Lombardia - Sala d'Arme Achille Marozzo",
    description: "Corsi di scherma antica e medievale a Milano, Lecco, Cremona e Varese",
    url: 'https://saam-lombardia.vercel.app',
    siteName: 'SAAM Lombardia',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/logo/saam_lombardia_logo.svg',
        width: 120,
        height: 120,
        alt: 'SAAM Lombardia Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SAAM Lombardia - Sala d'Arme Achille Marozzo",
    description: "Corsi di scherma antica e medievale a Milano, Lecco, Cremona e Varese",
    images: ['/images/logo/saam_lombardia_logo.svg'],
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
  other: {
    'geo.region': 'IT-LO',
    'geo.placename': 'Lombardia',
    'geo.position': '45.4642;9.1900',
    'ICBM': '45.4642, 9.1900',
  },
}

// Structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "SAAM Lombardia - Sala d'Arme Achille Marozzo",
  "alternateName": "SAAM Lombardia",
  "description": "Scuola di scherma storica e medievale in Lombardia",
  "url": "https://saam-lombardia.vercel.app",
  "logo": "https://saam-lombardia.vercel.app/images/logo/saam_lombardia_logo.svg",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Sala d'Arme Achille Marozzo",
    "url": "https://www.achillemarozzo.it/"
  },
  "affiliatedOrganization": [
    {
      "@type": "Organization", 
      "name": "Sala d'Arme Achille Marozzo",
      "url": "https://www.achillemarozzo.it/"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Lombardia",
    "addressCountry": "IT"
  },
  "areaServed": [
    "Milano",
    "Lecco", 
    "Cremona",
    "Varese"
  ],
  "sport": "Scherma Storica",
  "foundingDate": "2020",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Italian"
  },
  "offers": {
    "@type": "Offer",
    "description": "Corsi di scherma storica e medievale",
    "category": "Corsi di Scherma"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <meta name="theme-color" content="#18230F" />
        <meta name="msapplication-TileColor" content="#18230F" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="SAAM Lombardia" />
        <meta name="apple-mobile-web-app-title" content="SAAM Lombardia" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>{children}</body>
    </html>
  )
}

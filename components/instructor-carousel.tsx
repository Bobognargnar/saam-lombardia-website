"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Script from "next/script"

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

interface Instructor {
  id: number
  name: string
  role: string
  bio: string
  imageUrl: string
}

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export default function InstructorCarousel() {
  const [threeLoaded, setThreeLoaded] = useState(false)
  const [vantaLoaded, setVantaLoaded] = useState(false)
  const vantaEffects = useRef<{ [key: number]: any }>({})

  const initialInstructors: Instructor[] = [
    {
      id: 1,
      name: "Domenico Fichera",
      role: "Milano",
      bio: "Domenico Fichera è fondatore e istruttore della Sala d'Arme Achille Marozzo Lombardia, della quale coordina ad oggi la parte tecnica. Opera principalmente sulla sede di Milano, dove tiene corsi dal 2012. Come agonista, ha conquistato numerosi podi e ottime posizioni nelle classifiche nazionali ed internazionali.",
      imageUrl: "/images/instructors/dome_nb.png",
    },
    {
      id: 2,
      name: "Fabrizio -Fizzi- Magistro",
      role: "Milano",
      bio: "",
      imageUrl: "/images/instructors/fizzi_crop.png",
    },
    {
      id: 3,
      name: "Fabrizio La Rosa",
      role: "Milano",
      bio: "Fabrizio La Rosa ha cominciato a studiare scherma storica a Milano nel 2016, diventando presidente della Sala d'Arme Achille Marozzo Lombardia nel 2019 e istruttore nel 2025.",
      imageUrl: "/images/instructors/fabri_nb.png",
    },
    {
      id: 4,
      name: "Ruven Saraceni",
      role: "Lecco",
      bio: "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
      imageUrl: "/images/instructors/ruven_nb.png",
    },
    {
      id: 5,
      name: "Davide Losa",
      role: "Lecco",
      bio: "Ha intrapreso la carriera schermistica presso la palestra di Lecco nel 2007. Da allora frequenta regolarmente principalmente nell'area del lecchese, e dal 2022 ha intrapreso il percorso istruttorio, ottenendo l'abilitazione nel settembre del 2023",
      imageUrl: "/images/instructors/davidel_nb.png",
    },
    {
      id: 6,
      name: "Marco Valla",
      role: "Cremona",
      bio: "Vicepresidente della Saam Lombardia. Istruttore di primo livello dal 2019, tiene il corso base presso la palestra di Cremona. Appassionato di storia, arti marziali, oplologia e duello",
      imageUrl: "/images/instructors/marco_nb.png",
    },
    {
      id: 7,
      name: "Federico Di Marco",
      role: "Milano",
      bio: "Dopo una giovinezza di diligente inattività, scopre la scherma storica nel 2015 presso la Sala d'Arme Achille Marozzo. Dopo anni da nomade, si stabilisce a Milano e dal 2025 decide di tramandare spada, musica e goliardia nelle vesti di istruttore.",
      imageUrl: "/images/instructors/allen_nb.png",
    },
    {
      id: 8,
      name: "Davide Missaglia",
      role: "Varese",
      bio: "Insegna scherma storica dal 2022.",
      imageUrl: "/images/instructors/davide_nb.png",
    }
  ]

  const [shuffledInstructors, setShuffledInstructors] = useState<Instructor[]>([])

  useEffect(() => {
    setShuffledInstructors(shuffleArray([...initialInstructors]))
  }, []) // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (threeLoaded && vantaLoaded && window.VANTA && window.THREE) {
      // Initialize Vanta effects for each instructor card
      shuffledInstructors.forEach((instructor) => {
        const element = document.getElementById(`vanta-${instructor.id}`)
        if (element && !vantaEffects.current[instructor.id]) {
          vantaEffects.current[instructor.id] = window.VANTA.WAVES({
            el: element,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xa180b,
            shininess: 30.0,
            waveHeight: 10.5,
            waveSpeed: 1.05,
            zoom: 1.5,
          })
        }
      })
    }

    return () => {
      // Cleanup Vanta effects
      Object.values(vantaEffects.current).forEach((effect: any) => {
        if (effect && effect.destroy) {
          effect.destroy()
        }
      })
      vantaEffects.current = {}
    }
  }, [threeLoaded, vantaLoaded, shuffledInstructors])

  return (
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
          console.log("Vanta.js loaded successfully!")
          setVantaLoaded(true)
        }}
        onError={(e) => console.error("Failed to load Vanta.js:", e)}
      />
      <Carousel opts={{ loop: true, align: "start", slidesToScroll: 1 }} className="w-full">
        <CarouselContent className="-ml-4">
          {shuffledInstructors.map((instructor) => (
            <CarouselItem key={instructor.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 h-full">
                <div className="relative h-80 overflow-hidden group rounded-t-2xl">
                  <div id={`vanta-${instructor.id}`} className="absolute inset-0 rounded-t-2xl" />
                  <Image
                    src={instructor.imageUrl || "/placeholder.svg"}
                    alt={`${instructor.name} - Istruttore`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-forest-500">{instructor.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{instructor.role}</p>
                  <p className="text-gray-300 text-sm">{instructor.bio}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-forest-900/70 hover:bg-forest-900 text-white p-2 rounded-full ml-2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-forest-900/70 hover:bg-forest-900 text-white p-2 rounded-full mr-2" />
      </Carousel>
    </>
  )
}

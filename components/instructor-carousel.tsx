"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

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
  const initialInstructors: Instructor[] = [
    {
      id: 1,
      name: "Domenico Fichera",
      role: "Milano",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.",
      imageUrl: "/images/instructors/domenico_fichera.png",
    },
    {
      id: 2,
      name: "Fabrizio -Fizzi- Magistro",
      role: "Milano",
      bio: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.",
      imageUrl: "/images/instructors/fizzi_crop.png",
    },
    {
      id: 3,
      name: "Fabrizio La Rosa",
      role: "Milano",
      bio: "Dopo 10 anni di pratica di arti marziali giapponesi ed una parentesi di lancio del disco e del martello, ha cominciato a studiare scherma storica a Milano nel 2016, diventando ufficialmente istruttore nel 2025.",
      imageUrl: "/images/instructors/demo.png",
    },
    {
      id: 4,
      name: "Ruven Saraceni",
      role: "Lecco",
      bio: "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
      imageUrl: "/images/instructors/demo.png",
    },
    {
      id: 5,
      name: "Davide Losa",
      role: "Lecco",
      bio: "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis.",
      imageUrl: "/images/instructors/demo.png",
    },
    {
      id: 6,
      name: "Marco Valla",
      role: "Cremona",
      bio: "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.",
      imageUrl: "/images/instructors/demo.png",
    },
    {
      id: 7,
      name: "Federico Di Marco",
      role: "Milano",
      bio: "Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.",
      imageUrl: "/images/instructors/demo.png",
    },
    {
      id: 8,
      name: "Davide Missaglia",
      role: "Varese",
      bio: "Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.",
      imageUrl: "/images/instructors/davide.png",
    }
  ]

  const [shuffledInstructors, setShuffledInstructors] = useState<Instructor[]>([])

  useEffect(() => {
    setShuffledInstructors(shuffleArray([...initialInstructors]))
  }, []) // Empty dependency array ensures this runs only once on mount

  return (
    <Carousel opts={{ loop: true, align: "start", slidesToScroll: 1 }} className="w-full">
      <CarouselContent className="-ml-4">
        {shuffledInstructors.map((instructor) => (
          <CarouselItem key={instructor.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 h-full">
              <div className="relative h-80 overflow-hidden group rounded-t-2xl bg-forest-900">
                {" "}
                {/* Changed bg-black to bg-white here */}
                <Image
                  src={instructor.imageUrl || "/placeholder.svg"}
                  alt={`${instructor.name} - Istruttore`}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
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
  )
}

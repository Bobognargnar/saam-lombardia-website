"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface Instructor {
  name: string
  title: string
  imageUrl: string
}

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const initialInstructors: Instructor[] = [
  {
    name: "Fabrizio Valente",
    title: "Maestro d'Arme",
    imageUrl: "/images/instructors/demo.png",
  },
  {
    name: "Andrea Valente",
    title: "Istruttore",
    imageUrl: "/images/instructors/demo.png",
  },
  {
    name: "Marco Rossi",
    title: "Istruttore",
    imageUrl: "/images/instructors/demo.png",
  },
  {
    name: "Laura Bianchi",
    title: "Istruttrice",
    imageUrl: "/images/instructors/demo.png",
  },
  {
    name: "Giuseppe Verdi",
    title: "Istruttore",
    imageUrl: "/images/instructors/demo.png",
  },
  {
    name: "Anna Neri",
    title: "Istruttrice",
    imageUrl: "/images/instructors/demo.png",
  },
]

export default function InstructorCarousel() {
  const [shuffledInstructors, setShuffledInstructors] = React.useState<Instructor[]>([])

  React.useEffect(() => {
    setShuffledInstructors(shuffleArray(initialInstructors))
  }, [])

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1, // Advance one column at a time
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {shuffledInstructors.map((instructor, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-forest-700 text-white border-forest-600">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-forest-500 bg-white">
                    <Image
                      src={instructor.imageUrl || "/placeholder.svg"}
                      alt={instructor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-500">{instructor.name}</h3>
                  <p className="text-sm text-gray-300">{instructor.title}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

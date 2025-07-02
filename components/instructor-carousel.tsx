"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Instructor {
  id: number
  name: string
  role: string
  bio: string
  imageUrl: string
}

export default function InstructorCarousel() {
  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Domenico Fichera",
      role: "Milano",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
    {
      id: 2,
      name: "Fabrizio -Fizzi- Magistro",
      role: "Milano",
      bio: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
    {
      id: 3,
      name: "Fabrizio La Rosa",
      role: "Milano",
      bio: "Fusce aliquet pede non pede. Suspendisse dapibus lorem pellentesque magna. Integer nulla. Donec blandit feugiat ligula. Donec hendrerit, felis et imperdiet euismod, purus ipsum pretium metus.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
    {
      id: 4,
      name: "Ruven Saraceni",
      role: "Lecco",
      bio: "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
    {
      id: 5,
      name: "Davide Losa",
      role: "Lecco",
      bio: "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
    {
      id: 6,
      name: "Marco Valla",
      role: "Cremona",
      bio: "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
    {
      id: 7,
      name: "Federico Di Marco",
      role: "Milano",
      bio: "Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.",
      imageUrl:
        "https://sjc.microlink.io/y9xFjBum12B8RQPT5H6G63uOAXcaGugxTIk99LiE4YjNjSaDaLSsM7dyNKmTMnUzLNgrVTFLf5AUqoFfwahz8Q.jpeg",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.ceil(instructors.length / visibleCards)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1))
  }

  const getVisibleInstructors = () => {
    const startIdx = currentIndex * visibleCards
    return instructors.slice(startIdx, startIdx + visibleCards)
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="bg-forest-900/70 hover:bg-forest-900 text-white p-2 rounded-full ml-2"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div ref={carouselRef} className="flex transition-all duration-500 ease-in-out overflow-hidden">
        {getVisibleInstructors().map((instructor) => (
          <div key={instructor.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 h-full">
              <div className="relative h-80 overflow-hidden group rounded-t-2xl">
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
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="bg-forest-900/70 hover:bg-forest-900 text-white p-2 rounded-full mr-2"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-forest-500" : "bg-white opacity-50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

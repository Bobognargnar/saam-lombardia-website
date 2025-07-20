"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Mail, Phone, Info, X } from "lucide-react"
import LocationMap from "@/components/location-map"
import ScrollToSection from "@/components/scroll-to-section"
import InstructorCarousel from "@/components/instructor-carousel"
import VantaBackground from "@/components/vanta-background"
import WhatsAppButton from "@/components/ui/whatsapp-button"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import { Analytics } from '@vercel/analytics/next';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  const openDialog = (imageSrc: string) => {
    setCurrentImage(imageSrc)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setCurrentImage("")
  }

  const aboutImages = [
    "/images/locations/team_2025.jpg",
    "/images/locations/2.jpg",
    "/images/locations/5.jpg",
    "/images/locations/4.jpg",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-forest-900 text-white">
      <Analytics />
      <ScrollToSection />
      <header className="bg-forest-900 text-white z-50 relative border-b border-forest-800 sticky top-0">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/images/logo/saam_lombardia_logo.svg"
              alt="Sala D'Arme Achille Marozzo Lombardia Logo"
              width={60}
              height={60}
              className="mr-3"
            />
            <div className="text-left">
              <h1 className="text-lg font-semibold uppercase">Sala D&apos;Arme Achille Marozzo</h1>
              <p className="text-xs uppercase tracking-wider text-forest-500">Lombardia</p>
            </div>
          </div>

          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 uppercase text-sm font-medium">
              <li>
                <Link href="#" className="hover:text-forest-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-forest-500 transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link href="#locations" className="hover:text-forest-500 transition-colors">
                  Sedi
                </Link>
              </li>
              <li>
                <Link href="#instructors" className="hover:text-forest-500 transition-colors">
                  Istruttori
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-forest-500 transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.achillemarozzo.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-forest-500 hover:bg-forest-600 text-white px-3 py-1 rounded-2xl text-xs transition-colors"
                >
                  Sala d&apos;Arme Achille Marozzo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {/* Vanta.js animated background */}
          <VantaBackground />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-forest-900/40 z-5"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider drop-shadow-lg">CORSI DI SCHERMA</h2>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider drop-shadow-lg">ANTICA E MEDIEVALE</h2>
            <p className="text-xl md:text-2xl tracking-wide mb-8 drop-shadow-md">MILANO, LECCO, CREMONA, VARESE</p>
            <Link
              href="#about"
              className="btn-primary uppercase tracking-wider shadow-lg hover:shadow-xl transition-shadow"
            >
              Scopri di Più
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-forest-800 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-forest-500">CHI SIAMO</span> E COSA FACCIAMO
              </h2>
              <div className="w-20 h-1 bg-forest-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-forest-500">La Nostra Missione</h3>
                <p className="mb-6 text-gray-300">
                  L'ASD Sala d'Arme Achille Marozzo Lombardia è dedicata allo studio, alla pratica e alla diffusione
                  delle arti marziali storiche italiane. Il nostro obiettivo è preservare e tramandare le tecniche di
                  combattimento sviluppate dai maestri italiani dal Medioevo al Rinascimento.
                </p>
                <p className="mb-6 text-gray-300">
                  Attraverso un approccio rigoroso basato sullo studio dei trattati storici, offriamo corsi di scherma
                  storica per tutti i livelli, dai principianti agli atleti avanzati, in un ambiente inclusivo e
                  rispettoso.
                </p>
                <h3 className="text-2xl font-semibold mb-4 text-forest-500">Le Nostre Attività</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-forest-500 mr-2">•</span>
                    <span>
                      <strong>Corso Base annuale</strong>, introduttivo alla scherma storica: principi fondamentali e
                      maneggio della "spada da lato" attraverso lo studio dei principali autori rinascimentali della
                      scuola bolognese.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-500 mr-2">•</span>
                    <span>
                      <strong>Corsi Avanzati</strong> annuali: riservati a chi ha già superato il Corso Base, ogni anno
                      selezioniamo una disciplina diversa su cui focalizzarci, per esempio: spada e brocchiero, spada e
                      pugnale, spada a due mani, armi in asta, spada e cappa.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-500 mr-2">•</span>
                    <span>
                      Partecipazione a <strong>tornei</strong> e competizioni nazionali e internazionali
                    </span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {aboutImages.map((imageSrc, index) => (
                  <Dialog key={index} open={isDialogOpen && currentImage === imageSrc} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <div
                        className="aspect-square relative rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openDialog(imageSrc)}
                      >
                        <Image
                          src={imageSrc || "/placeholder.svg"}
                          alt={`Allenamento di scherma storica ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-full h-full p-0 border-none bg-transparent flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={currentImage || "/placeholder.svg"}
                          alt="Full screen image"
                          fill
                          className="object-contain"
                        />
                        <DialogClose asChild>
                          <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50">
                            <X className="h-8 w-8" />
                            <span className="sr-only">Close</span>
                          </button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations" className="py-20 bg-forest-900 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                LE NOSTRE <span className="text-forest-500">SEDI</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                La Sala d'Arme Achille Marozzo Lombardia è presente in diverse località della regione. Trova la sede più
                vicina a te e vieni a trovarci!
              </p>
              <div className="w-20 h-1 bg-forest-500 mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Corso Base Milano */}
              <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 hover:border-forest-600 transition-all duration-300 hover:scale-105 transform">
                <div className="h-64 relative">
                  <LocationMap
                    latitude={45.489244}
                    longitude={9.239741}
                    title="Milano, via Maniago 30"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-forest-500">Milano, Corso Base</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Presso i.c. Buzzati - Via Maniago, 30, Milano</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>Martedì e Giovedì: 20:00 - 22:00</p>
                      </div>
                    </div>
                    {/* <div className="flex items-start">
                      <Info className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Entrata qui:</span>
                      <Link href="https://maps.app.goo.gl/n1qb6D3MKFNgE5YBA" target="_blank" rel="noopener noreferrer">
                        <span>i.c. Buzzati</span>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Milano via Feltre */}
              <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 hover:border-forest-600 transition-all duration-300 hover:scale-105 transform">
                <div className="h-64 relative">
                  <LocationMap
                    latitude={45.490073}
                    longitude={9.244558}
                    title="Milano, via Feltre 68/1"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-forest-500">Milano, Corso Avanzato</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Presso i.c. Buzzati - Via Feltre, 68/1, Milano</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>Martedì, Mercoledì e Giovedì: 20:00 - 22:00</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Il corso avanzato è riservato a chi ha già superato il corso base</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milano via Colletta */}
              {/* <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 hover:border-forest-600 transition-all duration-300 hover:scale-105 transform">
                <div className="h-64 relative">
                  <LocationMap
                    latitude={45.448815}
                    longitude={9.211822}
                    title="Milano, via Pietro Colletta 48"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-forest-500">Milano Corso Avanzato 2</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Presso i.c. Colletta - Via Pietro Colletta, 48, Milano</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>Lunedì: 21:00 - 23:00</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sede ancora da confermare per l'anno 2025</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Lecco Malgrate */}
              <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 hover:border-forest-600 transition-all duration-300 hover:scale-105 transform">
                <div className="h-64 relative">
                  <LocationMap
                    latitude={45.8478182}
                    longitude={9.3749885}
                    title="Malgrate (LC), via Gaggio 3"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-forest-500">Lecco, Corso Base e Avanzato</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Via Gaggio, 3, Malgrate (LC)</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>Mercoledì, Venerdì: 20:00 - 22:00</p>
                      </div>
                    </div>
                    {/* <div className="flex items-start">
                      <Info className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sede ancora da confermare per l'anno 2025</span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Cremona  */}
              <div className="bg-forest-800 rounded-2xl overflow-hidden shadow-lg border border-forest-800 hover:border-forest-600 transition-all duration-300 hover:scale-105 transform">
                <div className="h-64 relative">
                  <LocationMap
                    latitude={45.116667}
                    longitude={10.033333}
                    // title="Indirizzo da confermare"
                    className="w-full h-full"
                    zoom={9}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-forest-500">Cremona, Corso Base e Avanzato</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cremona (CR)</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>Mercoledì, Venerdì: 20:00 - 22:00</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sede ancora da confermare per l'anno 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mb-16">
              <div className="w-20 h-1 bg-forest-500 mx-auto mt-4"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                La Sala d'Arme Achille Marozzo è presente anche a{" "}
                <Link
                  href="https://www.achillemarozzo.it/sedi/desenzano-del-garda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-500 hover:text-forest-400 underline transition-colors"
                >
                  Desenzano del Garda, come SSD Pro Desenzano
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section id="instructors" className="py-20 bg-forest-800 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                I NOSTRI <span className="text-forest-500">ISTRUTTORI</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Scopri i nostri istruttori e tecnici con vasta esperienza nelle arti marziali storiche italiane.
              </p>
              <div className="w-20 h-1 bg-forest-500 mx-auto mt-4"></div>
            </div>

            <InstructorCarousel />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-forest-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">UNISCITI A NOI</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-white">
              Sei interessato a scoprire l'arte della scherma storica? Vieni a trovarci in una delle nostre sedi per una
              lezione di prova gratuita!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="mailto:info@marozzoLombardia.it"
                className="bg-white hover:bg-gray-100 text-forest-600 px-8 py-3 rounded-2xl uppercase font-medium tracking-wider transition-colors"
              >
                Scrivici
              </Link>
            </div>

            {/* Contact Information by City */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 text-white">Oppure chiamaci</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Milano */}
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-3 text-white">Milano</h4>
                  <div className="w-12 h-0.5 bg-white/30 mx-auto mb-3"></div>
                                      <div className="space-y-2 text-white">
                      <p className="font-medium">Fabrizio</p>
                      <WhatsAppButton phoneNumber="+39 3498661112" />
                    </div>
                </div>

                {/* Lecco */}
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-3 text-white">Lecco</h4>
                  <div className="w-12 h-0.5 bg-white/30 mx-auto mb-3"></div>
                                      <div className="space-y-2 text-white">
                      <p className="font-medium">Davide</p>
                      <WhatsAppButton phoneNumber="+39 3498632304" />
                    </div>
                </div>

                {/* Cremona */}
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-3 text-white">Cremona</h4>
                  <div className="w-12 h-0.5 bg-white/30 mx-auto mb-3"></div>
                                      <div className="space-y-2 text-white">
                      <p className="font-medium">Marco</p>
                      <WhatsAppButton phoneNumber="+39 3473226550" />
                    </div>
                </div>

                {/* Varese */}
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-3 text-white">Varese</h4>
                  <div className="w-12 h-0.5 bg-white/30 mx-auto mb-3"></div>
                                      <div className="space-y-2 text-white">
                      <p className="font-medium">Davide</p>
                      <WhatsAppButton phoneNumber="+39 3336412403" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-forest-900 text-white py-12 border-t border-forest-800 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/logo/saam_lombardia_logo.svg"
                  alt="Sala D'Arme Achille Marozzo Lombardia Logo"
                  width={50}
                  height={50}
                  className="mr-3"
                />
                <div className="text-left">
                  <h3 className="text-base font-semibold uppercase">Sala D&apos;Arme Achille Marozzo</h3>
                  <p className="text-xs uppercase tracking-wider text-forest-500">Lombardia</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Associazione sportiva dilettantistica dedicata allo studio, alla pratica e alla diffusione delle arti
                marziali storiche italiane.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://www.instagram.com/saam.lombardia/"
                  className="text-gray-400 hover:text-forest-500 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.youtube.com/@AchilleMarozzoVideo"
                  className="text-gray-400 hover:text-forest-500 transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-forest-500">Link Utili</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-forest-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-forest-500 transition-colors">
                    Chi Siamo
                  </Link>
                </li>
                <li>
                  <Link href="#locations" className="text-gray-400 hover:text-forest-500 transition-colors">
                    Le Nostre Sedi
                  </Link>
                </li>
                <li>
                  <Link href="#instructors" className="text-gray-400 hover:text-forest-500 transition-colors">
                    I Nostri Istruttori
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-forest-500 transition-colors">
                    Contatti
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.achillemarozzo.it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-forest-500 transition-colors"
                  >
                    Sala d&apos;Arme Achille Marozzo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-forest-500">Contattaci</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Sede Legale: Via Antico Rodano 14, Cremona (CR) 26100 </span>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">asd-lombardia@achillemarozzo.it</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-forest-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">+39 3498661112 (Fabrizio) </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-forest-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Sala d&apos;Arme Achille Marozzo Lombardia. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

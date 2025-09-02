"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Phone, ChevronLeft, ChevronRight, Sparkles, Award, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { Project } from "@/lib/data/projects"

interface HeroWithProjectsProps {
  projects: Project[]
}

export function HeroWithProjects({ projects }: HeroWithProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, projects.length])

  const currentProject = projects[currentIndex] || null

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image Carousel */}
      {projects.length > 0 && (
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={currentProject?.images?.[0]}
                alt={currentProject?.title || "Fuar Standı"}
                className="object-cover"
                priority
                sizes="100vw"
                fallbackWidth={300}
                fallbackHeight={300}
                fallbackClassName="opacity-20"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur">
                <Award className="h-3 w-3 mr-1" />
                10+ Yıl Deneyim
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur">
                <Users className="h-3 w-3 mr-1" />
                Global Hizmet
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur">
                <Clock className="h-3 w-3 mr-1" />
                TR & DE Atölye
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Mekansal Tasarım &
              <span className="block text-primary mt-2">
                Mimari Dekorasyon
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              <span className="text-primary font-semibold">Fuar standı</span>, 
              <span className="text-primary font-semibold"> mimari dekorasyon</span>, 
              <span className="text-primary font-semibold"> proje yönetimi</span> ve 
              <span className="text-primary font-semibold"> tanıtım faaliyetleri</span> konularında uzman. 
              Türkiye, Almanya ve dünya genelinde güvenilir hizmet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/teklif-al" className="flex items-center">
                  Ücretsiz Teklif Al
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="tel:+905301204182" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Hemen Ara
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/10 backdrop-blur rounded-lg">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-xs text-gray-300">Stand Tipi</div>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur rounded-lg">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-xs text-gray-300">Hizmet</div>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur rounded-lg">
                <div className="text-2xl font-bold text-primary">7/24</div>
                <div className="text-xs text-gray-300">Destek</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Current Project Info */}
          {currentProject && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Son Projelerimizden
                </span>
              </div>

              {/* Project Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentProject.title}
              </h3>
              
              {/* Client & Type */}
              <div className="flex flex-wrap gap-3 mb-4">
                {currentProject.client_name && (
                  <Badge className="bg-primary/20 text-white border-primary/30">
                    {currentProject.client_name}
                  </Badge>
                )}
                {currentProject.stand_types?.name_tr && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    {currentProject.stand_types.name_tr}
                  </Badge>
                )}
              </div>

              {/* Description */}
              {currentProject.description && (
                <p className="text-gray-200 mb-6 line-clamp-3">
                  {currentProject.description}
                </p>
              )}

              {/* Features */}
              {currentProject.features && currentProject.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="text-xs px-3 py-1 bg-white/10 text-gray-200 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* View Project Button */}
              <Button asChild className="w-full bg-white text-black hover:bg-gray-100">
                <Link href={`/projeler/${currentProject.slug}`}>
                  Projeyi İncele
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Navigation Controls */}
        {projects.length > 1 && (
          <>
            {/* Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur p-3 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Önceki proje"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur p-3 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Sonraki proje"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    index === currentIndex 
                      ? 'w-12 bg-primary' 
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Proje ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Keşfet</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
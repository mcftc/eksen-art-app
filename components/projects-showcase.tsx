"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight, Eye, MapPin, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { Project } from "@/lib/data/projects"

interface ProjectsShowcaseProps {
  projects: Project[]
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, projects.length])

  if (!projects || projects.length === 0) {
    return null
  }

  const currentProject = projects[currentIndex]

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

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Başarı Hikayeleri
            </span>
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Son Projelerimiz
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Türkiye ve Avrupa&apos;da gerçekleştirdiğimiz başarılı fuar standı projelerimizden örnekler
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl bg-card shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid lg:grid-cols-2 gap-0"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <ImageWithFallback
                    src={currentProject.images?.[0]}
                    alt={currentProject.title}
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    fallbackWidth={200}
                    fallbackHeight={200}
                    fallbackClassName="opacity-30"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Featured Badge */}
                  {currentProject.is_featured && (
                    <Badge className="absolute top-6 left-6 bg-primary text-primary-foreground">
                      Öne Çıkan Proje
                    </Badge>
                  )}

                  {/* View Count */}
                  {currentProject.view_count !== null && (
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/90">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{currentProject.view_count} görüntülenme</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    {/* Stand Type */}
                    {currentProject.stand_types?.name_tr && (
                      <Badge variant="secondary" className="w-fit">
                        {currentProject.stand_types.name_tr}
                      </Badge>
                    )}

                    {/* Title & Client */}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                        {currentProject.title}
                      </h3>
                      {currentProject.client_name && (
                        <p className="text-lg text-muted-foreground">
                          {currentProject.client_name}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    {currentProject.description && (
                      <p className="text-muted-foreground line-clamp-3">
                        {currentProject.description}
                      </p>
                    )}

                    {/* Project Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {currentProject.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{currentProject.location}</span>
                        </div>
                      )}
                      {currentProject.event_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(currentProject.event_date).toLocaleDateString('tr-TR')}</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    {currentProject.features && currentProject.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {currentProject.features.slice(0, 4).map((feature) => (
                          <Badge key={feature} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="flex gap-4">
                      <Button asChild>
                        <Link href={`/projeler/${currentProject.slug}`}>
                          Detayları İncele
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/projeler">
                          Tüm Projeler
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label="Önceki proje"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label="Sonraki proje"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Proje ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-8 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {projects.slice(0, 8).map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => handleDotClick(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-transparent hover:border-primary/50'
              }`}
            >
              <ImageWithFallback
                src={project.images?.[0]}
                alt={project.title}
                className="object-cover"
                sizes="100px"
                fallbackWidth={40}
                fallbackHeight={40}
                fallbackClassName="opacity-50"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Building2, Users, Eye, ArrowRight } from "lucide-react"
import { Project } from "@/lib/data/projects"
import { createClient } from "@/lib/supabase/client"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface ProjectPageProps {
  project: Project
}

export function ProjectPage({ project }: ProjectPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    // Increment view count
    const incrementViewCount = async () => {
      const supabase = createClient()
      await supabase
        .from('projects')
        .update({ view_count: (project.view_count || 0) + 1 })
        .eq('id', project.id)
    }

    // Load related projects
    const loadRelatedProjects = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('projects')
        .select('*')
        .neq('id', project.id)
        .limit(3)
        .order('created_at', { ascending: false })
      
      if (data) setRelatedProjects(data)
    }

    incrementViewCount()
    loadRelatedProjects()
  }, [project.id, project.view_count])

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (project.images?.length || 1) - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (project.images?.length || 1) - 1 : prev - 1
    )
  }

  return (
    <div className="py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <span>/</span>
              <Link href="/projeler" className="hover:text-foreground transition-colors">
                Projeler
              </Link>
              <span>/</span>
              <span className="text-foreground">{project.title}</span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden group">
                <ImageWithFallback
                  src={project.images?.[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallbackWidth={150}
                  fallbackHeight={150}
                  fallbackClassName="opacity-30"
                />
                
                {project.images && project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnail Grid */}
              {project.images && project.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {project.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-[4/3] bg-muted rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 100px"
                        fallbackWidth={40}
                        fallbackHeight={40}
                        fallbackClassName="opacity-50"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {project.is_featured && (
                      <Badge variant="secondary">Öne Çıkan</Badge>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-4 w-4 mr-1" />
                      {project.view_count || 0} görüntülenme
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {project.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {project.description}
                </p>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Müşteri</p>
                      <p className="text-muted-foreground">{project.client_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Konum</p>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Etkinlik</p>
                      <p className="text-muted-foreground">{project.event_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.event_date || Date.now() ).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Stand Alanı</p>
                      <p className="text-muted-foreground">{project.size_sqm} m²</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Proje Özellikleri</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-4 pt-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/teklif-al">
                    Benzer Proje İsteyin
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <Link href="/iletisim">
                    <Users className="mr-2 h-4 w-4" />
                    Detaylı Bilgi Alın
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">İlgili Projeler</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projeler/${relatedProject.slug}`}
                  className="group"
                >
                  <div className="bg-muted/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3] bg-muted">
                      <ImageWithFallback
                        src={relatedProject.images?.[0]}
                        alt={relatedProject.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fallbackWidth={80}
                        fallbackHeight={80}
                        fallbackClassName="opacity-30"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {relatedProject.client_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {relatedProject.event_name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/projeler">
                  Tüm Projeleri Görüntüle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
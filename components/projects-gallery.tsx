"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Eye, ArrowRight, Building2 } from "lucide-react"
import { Project } from "@/lib/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface ProjectsGalleryProps {
  projects: Project[]
  featured?: boolean
}

export function ProjectsGallery({ projects, featured = false }: ProjectsGalleryProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {featured ? "Öne çıkan proje bulunmuyor." : "Proje bulunmuyor."}
        </p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${featured ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <Link href={`/projeler/${project.slug}`}>
            <div className="relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Project Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                <ImageWithFallback
                  src={project.images?.[0]}
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fallbackWidth={120}
                  fallbackHeight={120}
                  fallbackClassName="opacity-30"
                />
                
                {/* Featured Badge */}
                {project.is_featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Öne Çıkan
                  </Badge>
                )}
                
                {/* Stand Type Badge */}
                {project.stand_types?.name_tr && (
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    {project.stand_types.name_tr}
                  </Badge>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm">
                    Detayları Görüntüle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.client_name && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.client_name}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Project Metadata */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  {project.location && (
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  )}
                  
                  {project.event_date && (
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{new Date(project.event_date).toLocaleDateString('tr-TR')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    {project.size_sqm && (
                      <div className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        <span>{project.size_sqm}m²</span>
                      </div>
                    )}
                    
                    {project.view_count !== null && (
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{project.view_count}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Features Preview */}
                {project.features && project.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {project.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
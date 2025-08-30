"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { StandType } from "@/lib/data/stand-types"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface StandTypesSectionProps {
  standTypes: StandType[]
}

const standTypeColors = [
  "from-amber-500/20 to-orange-500/20",
  "from-blue-500/20 to-cyan-500/20", 
  "from-green-500/20 to-emerald-500/20",
  "from-purple-500/20 to-pink-500/20",
]

export function StandTypesSection({ standTypes }: StandTypesSectionProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Fuar Standı Çözümlerimiz
          </h2>
          <p className="text-lg text-muted-foreground">
            İhtiyacınıza ve bütçenize uygun profesyonel stand çözümleri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standTypes?.map((standType, index) => {
            const color = standTypeColors[index % standTypeColors.length]
            
            return (
              <motion.div
                key={standType.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <Link href={`/stand-tipleri/${standType.slug}`}>
                  <div className="relative overflow-hidden rounded-lg border bg-card">
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                      <ImageWithFallback
                        src={standType.images?.[0]}
                        alt={standType.name_tr}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        fallbackWidth={120}
                        fallbackHeight={120}
                        fallbackClassName="opacity-30"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{standType.name_tr}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {standType.description_tr}
                      </p>
                      
                      <ul className="space-y-2 mb-4">
                        {standType.features?.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Detaylı Bilgi
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
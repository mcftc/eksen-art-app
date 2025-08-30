"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Palette, Factory, Wrench, Warehouse, Printer } from "lucide-react"
import { Service } from "@/lib/data/services"

const serviceIcons = {
  Palette,
  Factory,
  Wrench,
  Warehouse,
  Printer,
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Tam Kapsamlı Hizmetler
          </h2>
          <p className="text-lg text-muted-foreground">
            Fuar standınızın her aşamasında yanınızdayız
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services?.map((service, index) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Palette
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/hizmetler/${service.slug}`}>
                  <div className="group relative h-full rounded-lg border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{service.name_tr}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description_tr}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg mb-6">
            <strong>Anahtar teslim çözümlerimizle</strong> fuarınıza odaklanın, gerisini bize bırakın.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-6 py-16 sm:px-12 sm:py-20"
        >
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Fuarınız İçin Profesyonel Destek Alın
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Deneyimli ekibimizle markanızı en iyi şekilde temsil edecek stand çözümlerini keşfedin.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/teklif-al">
                  Hemen Teklif Al
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
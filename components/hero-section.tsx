"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      
      <div className="container relative py-20 md:py-28 lg:py-36 xl:py-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Premium Fuar Standı Çözümleri
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1]"
          >
            <span className="block">Fuarlarınızda</span>
            <span className="block bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              Fark Yaratın
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Ahşap, Maxima, Modüler ve Paket stand çözümleriyle markanızı öne çıkarın.
            <span className="block mt-2">
              Tasarımdan kuruluma kadar tam hizmet, İstanbul merkezli, Türkiye ve Avrupa genelinde.
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none"
          >
            <Button size="lg" className="text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link href="/teklif-al">
                Ücretsiz Teklif Al
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 hover:bg-muted/50 transition-all duration-300" asChild>
              <Link href="/projeler">
                Projelerimizi İnceleyin
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-muted/20 transition-all duration-300"
          >
            <div className="mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-4 group-hover:scale-110 transition-transform duration-300">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">15+ Yıl Deneyim</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sektörde lider konumda profesyonel hizmet
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-muted/20 transition-all duration-300"
          >
            <div className="mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">500+ Mutlu Müşteri</h3>
            <p className="text-muted-foreground leading-relaxed">
              Türkiye ve Avrupa&apos;da başarılı projeler
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-muted/20 transition-all duration-300"
          >
            <div className="mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-4 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Anahtar Teslim</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tasarımdan demontaja tam hizmet
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
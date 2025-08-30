"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Download, Phone, ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { StandType } from "@/lib/data/stand-types"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { useState } from "react"

interface StandTypePageProps {
  standType: StandType
}

export function StandTypePage({ standType }: StandTypePageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (standType.images?.length || 1) - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (standType.images?.length || 1) - 1 : prev - 1
    )
  }
  
  // Get additional features based on stand type
  const getAdditionalFeatures = (slug: string) => {
    const featuresMap: { [key: string]: string[] } = {
      ahsap: [
        "Özgün ve benzersiz tasarım imkanı",
        "Premium malzeme kalitesi", 
        "Marka kimliğini tam yansıtma",
        "Uzun ömürlü kullanım",
        "Yüksek prestij değeri"
      ],
      maxima: [
        "Hızlı kurulum ve söküm",
        "Tekrar kullanılabilir sistem",
        "Modern ve şık görünüm", 
        "Modüler genişletme imkanı",
        "Uygun maliyet"
      ],
      moduler: [
        "Esnek tasarım seçenekleri",
        "Kolay taşıma ve depolama",
        "Hızlı kurulum",
        "Çevre dostu malzemeler",
        "Düşük nakliye maliyeti"
      ],
      paket: [
        "En ekonomik çözüm",
        "Çok hızlı teslimat",
        "Tek kişi ile kurulum",
        "Hafif ve portatif",
        "Standart ölçüler"
      ]
    }
    return featuresMap[slug] || []
  }

  const additionalFeatures = getAdditionalFeatures(standType.slug)
  
  return (
    <div className="py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <span>/</span>
              <Link href="/stand-tipleri" className="hover:text-foreground transition-colors">
                Stand Tipleri
              </Link>
              <span>/</span>
              <span className="text-foreground">{standType.name_tr}</span>
            </nav>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {standType.name_tr}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {standType.description_tr}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Özellikler</h3>
                  <ul className="space-y-2">
                    {standType.features?.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {additionalFeatures.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Avantajlar</h3>
                    <ul className="space-y-2">
                      {additionalFeatures.map((advantage) => (
                        <li key={advantage} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-6 space-y-4">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/teklif-al">
                      Ücretsiz Teklif Al
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <a href={`tel:${siteConfig.contact.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Hemen Arayın: {siteConfig.contact.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden group">
                <ImageWithFallback
                  src={standType.images?.[currentImageIndex]}
                  alt={`${standType.name_tr} - ${currentImageIndex + 1}`}
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallbackWidth={150}
                  fallbackHeight={150}
                  fallbackClassName="opacity-30"
                />
                
                {standType.images && standType.images.length > 1 && (
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
                      {standType.images.map((_, index) => (
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
              {standType.images && standType.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {standType.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-[4/3] bg-muted rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${standType.name_tr} thumbnail ${index + 1}`}
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
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detaylar</TabsTrigger>
                  <TabsTrigger value="sizes">Ölçüler</TabsTrigger>
                  <TabsTrigger value="process">Süreç</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Kullanılan Malzemeler</h4>
                    <div className="flex flex-wrap gap-2">
                      {standType.materials?.map((material) => (
                        <span
                          key={material}
                          className="px-3 py-1 bg-muted rounded-full text-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Teslim Süresi</h4>
                    <p className="text-muted-foreground">{standType.lead_time}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">İdeal Kullanıcılar</h4>
                    <p className="text-muted-foreground">{standType.ideal_for}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="sizes" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Standart Ölçüler</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {standType.sizes?.map((size) => (
                        <div
                          key={size}
                          className="border rounded-lg p-3 text-center hover:border-primary transition-colors"
                        >
                          <span className="font-semibold">{size}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      * Özel ölçülerde üretim yapılabilmektedir
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="process" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Çalışma Süreci</h4>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3">
                          1
                        </span>
                        <div>
                          <p className="font-medium">İhtiyaç Analizi</p>
                          <p className="text-sm text-muted-foreground">
                            Fuar alanı, bütçe ve marka hedeflerinizi belirliyoruz
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3">
                          2
                        </span>
                        <div>
                          <p className="font-medium">3D Tasarım</p>
                          <p className="text-sm text-muted-foreground">
                            Profesyonel ekibimiz özel tasarımınızı hazırlıyor
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Üretim</p>
                          <p className="text-sm text-muted-foreground">
                            Modern tesislerimizde kaliteli üretim yapıyoruz
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3">
                          4
                        </span>
                        <div>
                          <p className="font-medium">Kurulum</p>
                          <p className="text-sm text-muted-foreground">
                            Deneyimli ekibimizle zamanında kurulum sağlıyoruz
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Katalog İndirin</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {standType.name_tr} hakkında detaylı bilgi ve örnek projeler için kataloğumuzu indirin.
                </p>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  PDF Katalog İndir
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Phone, MessageSquare } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { Service } from "@/lib/data/services"
import { Palette, Factory, Wrench, Warehouse, Printer } from "lucide-react"

const serviceIcons = {
  Palette,
  Factory,
  Wrench,
  Warehouse,
  Printer,
}

interface ServicePageProps {
  service: Service
}

export function ServicePage({ service }: ServicePageProps) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Palette

  // Get detailed info based on service slug
  const getServiceDetails = (slug: string) => {
    const detailsMap: { [key: string]: {
      process?: { title: string; description: string }[];
      showcase?: { title: string; description: string; metric: string }[];
      benefits?: string[];
      timeline?: string;
    } } = {
      tasarim: {
        process: [
          { title: "Konsept Geliştirme", description: "Marka kimliğinize uygun yaratıcı konsept tasarımı" },
          { title: "3D Modelleme", description: "Fotorealistik 3D görselleştirme ve sanal tur imkanı" },
          { title: "Teknik Çizimler", description: "Üretim için detaylı teknik plan ve ölçü çizimleri" },
          { title: "Onay Süreci", description: "Müşteri onayı sonrası revizyon ve finalizasyon" }
        ],
        benefits: [
          "Profesyonel tasarım ekibi",
          "Sınırsız revizyon hakkı",
          "3D görselleştirme",
          "Teknik dokümantasyon"
        ],
        timeline: "5-7 iş günü"
      },
      imalat: {
        process: [
          { title: "Malzeme Tedariki", description: "Kaliteli ve sertifikalı malzemelerin temini" },
          { title: "Üretim Süreci", description: "Modern tesislerde uzman ekiple üretim" },
          { title: "Kalite Kontrol", description: "Her aşamada titiz kalite kontrol testleri" },
          { title: "Paketleme", description: "Güvenli nakliye için özel paketleme sistemi" }
        ],
        benefits: [
          "Modern üretim tesisi",
          "Kaliteli malzeme garantisi",
          "Zamanında teslimat",
          "Üretim takibi"
        ],
        timeline: "10-15 iş günü"
      },
      kurulum: {
        process: [
          { title: "Saha Analizi", description: "Fuar alanında teknik ölçüm ve analiz" },
          { title: "Kurulum Planı", description: "Optimum kurulum zamanlaması ve ekip planı" },
          { title: "Montaj", description: "Profesyonel ekiple hızlı ve güvenli montaj" },
          { title: "Test & Teslim", description: "Final kontroller ve müşteri teslimi" }
        ],
        benefits: [
          "Deneyimli kurulum ekibi",
          "Hızlı montaj süreci",
          "Güvenlik önceliği",
          "7/24 teknik destek"
        ],
        timeline: "1-2 gün"
      },
      depolama: {
        process: [
          { title: "Demontaj", description: "Fuar sonrası dikkatli demontaj işlemi" },
          { title: "Envanter", description: "Tüm parçaların kayıt altına alınması" },
          { title: "Depolama", description: "Güvenli ve organize depo ortamında muhafaza" },
          { title: "Bakım", description: "Düzenli bakım ve onarım hizmetleri" }
        ],
        benefits: [
          "Güvenli depolama alanı",
          "Envanter takip sistemi",
          "Düzenli bakım hizmeti",
          "Sigortalı muhafaza"
        ],
        timeline: "Sürekli hizmet"
      },
      baski: {
        process: [
          { title: "Tasarım Hazırlık", description: "Baskı için dosya hazırlığı ve renk profili" },
          { title: "Malzeme Seçimi", description: "Uygun baskı malzemesi ve teknik seçimi" },
          { title: "Baskı Üretimi", description: "Yüksek kaliteli dijital baskı üretimi" },
          { title: "Finishing", description: "Kesim, laminasyon ve finishing işlemleri" }
        ],
        benefits: [
          "Yüksek çözünürlük baskı",
          "Dayanıklı malzemeler",
          "Geniş format imkanı",
          "Hızlı üretim"
        ],
        timeline: "3-5 iş günü"
      }
    }
    return detailsMap[slug] || {}
  }

  const details = getServiceDetails(service.slug)

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
              <Link href="/hizmetler" className="hover:text-foreground transition-colors">
                Hizmetlerimiz
              </Link>
              <span>/</span>
              <span className="text-foreground">{service.name_tr}</span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-lg bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">
                    {service.name_tr}
                  </h1>
                  <p className="text-muted-foreground">Profesyonel Hizmet</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                {service.description_tr}
              </p>

              {service.features && service.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Hizmet Özellikleri</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.benefits && (
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Avantajlar</h3>
                  <ul className="space-y-3">
                    {details.benefits.map((benefit: string) => (
                      <li key={benefit} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/teklif-al">
                    Hizmet Teklifi Al
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <Link href="/iletisim">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Detaylı Bilgi Al
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Çalışma Süreci</h3>
                {details.process && (
                  <ol className="space-y-4">
                    {details.process.map((step, index) => (
                      <li key={step.title} className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-4">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {details.timeline && (
                <div className="bg-primary/10 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Teslim Süresi</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{details.timeline}</p>
                  <p className="text-sm text-muted-foreground">
                    Proje büyüklüğüne göre değişkenlik gösterebilir
                  </p>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">İletişim</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Uzman Danışma</p>
                    <a 
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-primary hover:underline"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium">E-posta</p>
                    <a 
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium">Çalışma Saatleri</p>
                    <p className="text-muted-foreground text-sm">
                      {siteConfig.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
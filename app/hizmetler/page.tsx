import { Metadata } from "next"
import { ServicesSection } from "@/components/services-section"
import { CTASection } from "@/components/cta-section"
import { siteConfig } from "@/lib/site-config"
import { getServices } from "@/lib/data/services"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: `Hizmetlerimiz | ${siteConfig.name}`,
  description: "Fuar standı tasarımı, imalatı, kurulumu, depolaması ve baskı hizmetleri. Tasarımdan kuruluma kadar anahtar teslim fuar stand çözümleri.",
  keywords: [
    "fuar standı hizmetleri",
    "stand tasarımı",
    "stand imalatı",
    "stand kurulumu",
    "stand depolaması",
    "fuar baskı hizmetleri"
  ],
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="py-8">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Fuar standınızın her aşamasında profesyonel hizmet. Tasarımdan kuruluma, 
            depolamadan baskıya kadar anahtar teslim çözümlerle yanınızdayız.
          </p>
        </div>
      </div>
      
      <ServicesSection services={services} />
      
      <div className="container py-16">
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Neden Tam Hizmet?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Tek Noktadan Hizmet</h3>
              <p className="text-muted-foreground text-sm">
                Tüm ihtiyaçlarınız için tek firma ile çalışmanın rahatlığı
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Koordinasyon</h3>
              <p className="text-muted-foreground text-sm">
                Tüm süreçlerin koordinasyonu tek elden yönetilir
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Maliyet Avantajı</h3>
              <p className="text-muted-foreground text-sm">
                Paket hizmetlerle daha ekonomik çözümler
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <CTASection />
    </div>
  )
}
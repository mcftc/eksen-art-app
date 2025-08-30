import { Metadata } from "next"
import { QuoteRequestForm } from "@/components/quote-request-form"
import { siteConfig } from "@/lib/site-config"
import { getStandTypes } from "@/lib/data/stand-types"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: `Ücretsiz Teklif Al | ${siteConfig.name}`,
  description: "Fuar standınız için ücretsiz teklif alın. Ahşap, Maxima, Modüler ve Paket stand seçenekleri için detaylı fiyat teklifi ve danışmanlık hizmeti.",
  keywords: [
    "fuar standı teklif",
    "ücretsiz teklif",
    "stand fiyatları",
    "fuar standı danışmanlık",
    "stand tasarım teklifi"
  ],
}

export default async function QuoteRequestPage() {
  const standTypes = await getStandTypes()

  return (
    <div className="py-8">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Ücretsiz Teklif Al
            </h1>
            <p className="text-lg text-muted-foreground">
              Fuar standınız için detaylı teklif alın. Uzman ekibimiz size en uygun çözümü sunar.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuoteRequestForm standTypes={standTypes} />
            </div>

            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Neden Eksenart?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>15+ yıl sektör deneyimi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>500+ başarılı proje</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Türkiye ve Avrupa genelinde hizmet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Anahtar teslim çözümler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>7/24 müşteri desteği</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">İletişim Bilgileri</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mt-1 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-muted-foreground hover:text-primary">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mt-1 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">E-posta</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mt-1 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-muted-foreground">{siteConfig.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mt-1 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Çalışma Saatleri</p>
                      <p className="text-muted-foreground">{siteConfig.contact.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Hızlı Yanıt</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Teklif talebinizi aldıktan sonra 2 iş günü içinde detaylı teklifimizi size ileteceğiz.
                </p>
                <div className="text-xs text-muted-foreground">
                  * Acil durumlar için direkt telefon ile iletişime geçebilirsiniz.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/lib/site-config"
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: `İletişim | ${siteConfig.name}`,
  description: "Eksenart Mimarlık ile iletişime geçin. Fuar standı projeleriniz için ücretsiz danışmanlık ve detaylı bilgi alın.",
  keywords: [
    "iletişim",
    "fuar standı danışmanlık",
    "eksenart iletişim",
    "stand tasarım danışmanlık",
    "İstanbul fuar standı"
  ],
}

export default function ContactPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            İletişim
          </h1>
          <p className="text-lg text-muted-foreground">
            Fuar standı projeleriniz için bizimle iletişime geçin. 
            Uzman ekibimizden ücretsiz danışmanlık alın.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-6 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                İletişim Bilgileri
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Telefon</h4>
                    <a 
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      7/24 acil durumlar için
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">E-posta</h4>
                    <a 
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 iş günü içinde yanıt
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Adres</h4>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Randevu ile ziyaret
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Çalışma Saatleri</h4>
                    <p className="text-muted-foreground text-sm">
                      {siteConfig.contact.workingHours}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pazar kapalı
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Hızlı Destek</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Acil Destek</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    7/24
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Teknik Destek</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    İş Günleri
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Teklif Yanıtı</span>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    2 İş Günü
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Sosyal Medya</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(siteConfig.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Sık Sorulan Sorular
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Teklif süreci nasıl işliyor?</h3>
              <p className="text-sm text-muted-foreground">
                Talebinizi aldıktan sonra 24 saat içinde size dönüş yapıyor, 
                2 iş günü içinde detaylı teklif sunuyoruz.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Uluslararası fuarlara hizmet veriyor musunuz?</h3>
              <p className="text-sm text-muted-foreground">
                Evet, Türkiye ve Avrupa genelinde fuar standı kurulum 
                hizmeti sunuyoruz.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Minimum stand büyüklüğü var mı?</h3>
              <p className="text-sm text-muted-foreground">
                3m²&apos;den başlayarak her boyutta stand tasarımı ve 
                üretimi yapabiliyoruz.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Tasarım değişikliği yapabilir miyim?</h3>
              <p className="text-sm text-muted-foreground">
                Üretim başlamadan önce sınırsız revizyon hakkınız bulunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Metadata } from "next"
import { StandTypesSection } from "@/components/stand-types-section"
import { CTASection } from "@/components/cta-section"
import { siteConfig } from "@/lib/site-config"
import { getStandTypes } from "@/lib/data/stand-types"

export const metadata: Metadata = {
  title: `Fuar Standı Tipleri | ${siteConfig.name}`,
  description: "Ahşap, Maxima, Modüler ve Paket fuar standı çözümlerimizi keşfedin. Her bütçe ve ihtiyaca uygun profesyonel stand tasarımları.",
  keywords: [
    "fuar standı tipleri",
    "stand çeşitleri",
    "ahşap stand",
    "maxima stand",
    "modüler stand",
    "paket stand",
    "fuar standı seçenekleri"
  ],
}

export default async function StandTypesPage() {
  const standTypes = await getStandTypes()
  return (
    <div className="py-8">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Fuar Standı Tipleri
          </h1>
          <p className="text-lg text-muted-foreground">
            İhtiyacınıza ve bütçenize en uygun fuar standı çözümünü birlikte belirleyelim.
            Ahşap&apos;tan Maxima&apos;ya, Modüler&apos;den Paket stand&apos;a kadar geniş ürün yelpazemizle yanınızdayız.
          </p>
        </div>
      </div>
      
      <StandTypesSection standTypes={standTypes} />
      
      <div className="container py-12">
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Hangi Stand Tipi Size Uygun?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Ahşap Stand Seçmeniz İçin:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Markanıza özel, benzersiz tasarım istiyorsanız</li>
                <li>• Premium görünüm ve prestij arıyorsanız</li>
                <li>• Uzun süreli kullanım planlıyorsanız</li>
                <li>• Büyük alan ve özel detaylar gerekiyorsa</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Maxima Stand Seçmeniz İçin:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Modern ve şık görünüm istiyorsanız</li>
                <li>• Hızlı kurulum ve söküm önemliyse</li>
                <li>• Tekrar kullanılabilir sistem arıyorsanız</li>
                <li>• Orta-büyük ölçekli standlar için</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Modüler Stand Seçmeniz İçin:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Esnek ve değiştirilebilir tasarım istiyorsanız</li>
                <li>• Farklı fuarlarda farklı boyutlar kullanacaksanız</li>
                <li>• Kolay taşıma ve depolama önemliyse</li>
                <li>• Çevre dostu çözüm arıyorsanız</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Paket Stand Seçmeniz İçin:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Ekonomik çözüm arıyorsanız</li>
                <li>• Hızlı teslimat gerekiyorsa</li>
                <li>• Küçük alan yeterliyse</li>
                <li>• İlk fuar deneyiminizse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <CTASection />
    </div>
  )
}
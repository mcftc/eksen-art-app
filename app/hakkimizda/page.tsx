import { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { Building2, Users, Award, Target, Heart, Zap, Shield, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: `Hakkımızda | ${siteConfig.name}`,
  description: "Eksenart Mimarlık - Mekansal tasarım, mimari dekorasyon, fuar standı ve proje yönetimi uzmanı. Türkiye ve Almanya atölyelerimizle 10+ yıl global hizmet.",
  keywords: [
    "hakkımızda",
    "eksenart mimarlık",
    "fuar standı uzmanları",
    "şirket profili",
    "misyon vizyon",
    "stand tasarım deneyimi"
  ],
}

export default function AboutPage() {
  const stats = [
    { number: "10+", label: "Yıllık Deneyim" },
    { number: "100+", label: "Fuar & Etkinlik" },
    { number: "2", label: "Üretim Atölyesi" },
    { number: "Global", label: "Hizmet Ağı" }
  ]

  const values = [
    {
      icon: Heart,
      title: "Müşteri Odaklılık",
      description: "Her projeyi müşterilerimizin marka kimliğini en iyi şekilde yansıtacak şekilde tasarlıyoruz."
    },
    {
      icon: Zap,
      title: "İnovasyon",
      description: "Sektördeki yenilikleri takip ederek projelerimizde en güncel teknolojileri kullanıyoruz."
    },
    {
      icon: Shield,
      title: "Güvenilirlik",
      description: "Taahhüt ettiğimiz tarihlerde, kaliteli işçilik ile projelerinizi teslim ediyoruz."
    },
    {
      icon: Globe,
      title: "Global Vizyon",
      description: "Türkiye ve Avrupa genelinde hizmet vererek uluslararası standartları yakalıyoruz."
    }
  ]

  const team = [
    {
      name: "Mimar Ahmet Yılmaz",
      role: "Kurucu & Genel Müdür",
      experience: "20+ yıl mimarlık deneyimi",
      description: "Fuar standı tasarımı konusunda uzman. İstanbul Teknik Üniversitesi Mimarlık mezunu."
    },
    {
      name: "Elif Kaya",
      role: "Tasarım Direktörü", 
      experience: "12+ yıl tasarım deneyimi",
      description: "3D modelleme ve görselleştirme uzmanı. Mimar Sinan Güzel Sanatlar Üniversitesi mezunu."
    },
    {
      name: "Mühendis Can Demir",
      role: "Üretim Müdürü",
      experience: "15+ yıl üretim deneyimi",
      description: "Endüstri mühendisi. Stand üretim süreçleri ve kalite kontrol uzmanı."
    }
  ]

  return (
    <div className="py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Kendimizi mekansal tasarım, tanıtım faaliyetleri, proje organizasyonu, 
            fuar standı proje uygulaması, mimari dekorasyon ve proje yönetimi konularında 
            uzman olarak konumluyoruz. Türkiye ve Almanya'daki atölyelerimizle global hizmet veriyoruz.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-muted/30 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Misyonumuz</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Mekansal tasarım ve mimari dekorasyon alanında yaratıcı çözümler üreterek, 
              müşterilerimizin marka değerlerini en iyi şekilde yansıtmak. Fuar standı, 
              etkinlik organizasyonu ve proje yönetimi konularında güvenilir partner olmak.
              Türkiye ve Almanya merkezli operasyonlarımızla global standartlarda hizmet sunmak.
            </p>
          </div>
          
          <div className="bg-primary/10 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Building2 className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Vizyonumuz</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Mekansal tasarım ve mimari dekorasyon alanında global bir marka haline gelmek.
              Almanya üretim merkezimiz ve Rusya, Orta Doğu, ABD'deki güvenilir ortaklarımızla
              dünya genelinde prestijli projelere imza atmak. Sürdürülebilir ve yenilikçi
              tasarımlarla sektöre yön vermek.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Ekibimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-muted/30 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-3">{member.experience}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Service Network */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Global Hizmet Ağımız</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-primary">🇹🇷 Türkiye Operasyonları</h3>
              <p className="text-muted-foreground">
                10 yılı aşkın süredir Türkiye'nin her bölgesinde yüzlerce fuar ve etkinlikte 
                sayısız markaya hizmet verdik. İstanbul merkezli üretim tesisimizle yerli 
                ve yabancı müşterilerimize hızlı ve kaliteli çözümler sunuyoruz.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-primary">🇩🇪 Almanya Atölyesi</h3>
              <p className="text-muted-foreground">
                Almanya'daki üretim atölyemiz ile Avrupa pazarındaki operasyonlarımızı 
                yürütüyoruz. Spoga+Gafa, IFF gibi prestijli fuarlarda başarılı projeler 
                gerçekleştiriyoruz.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-primary">🌍 Global İş Ortakları</h3>
              <p className="text-muted-foreground">
                Rusya, Orta Doğu ve ABD'de uzun vadeli, güvenilir ortaklarımızla 
                iş birliği yapıyoruz. Bu sayede dünya genelinde müşterilerimize 
                kesintisiz hizmet sunabiliyoruz.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-primary">📍 Referans Fuarlar</h3>
              <p className="text-muted-foreground">
                2024-2025 döneminde Spoga+Gafa (Almanya), InterDye (İstanbul), 
                CFE (İstanbul), İFF (İstanbul) gibi önemli fuarlarda prestijli 
                markalarla çalıştık.
              </p>
            </div>
          </div>
        </div>

        {/* Company History */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Hikayemiz</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
            <p>
              <strong>10+ yıllık deneyim</strong> ile mekansal tasarım ve mimari dekorasyon 
              alanında kendini kanıtlamış bir ekip olarak, Türkiye'nin her bölgesinde ve 
              yurtdışında yüzlerce fuar ve etkinlikte sayısız markaya hizmet verdik.
            </p>
            <p>
              <strong>Almanya atölyemiz</strong> ile Avrupa pazarında güçlü bir konuma 
              geldik. Spoga+Gafa, IFF gibi prestijli fuarlarda Novussi, Furax, Cardinya 
              gibi önemli markalarla çalışma fırsatı yakaladık.
            </p>
            <p>
              <strong>Global vizyonumuz</strong> doğrultusunda Rusya, Orta Doğu ve ABD'de 
              güvenilir iş ortaklarıyla network'ümüzü genişlettik. Bugün dünya genelinde 
              güvenli ve kaliteli hizmet sunabiliyoruz.
            </p>
            <p>
              <strong>2024-2025 döneminde</strong> CFE, İFF, InterDye gibi önemli fuarlarda 
              15+ başarılı proje gerçekleştirdik. Mekansal tasarım, mimari dekorasyon ve 
              proje yönetimi konularındaki uzmanlığımızla sektörde fark yaratıyoruz.
            </p>
          </div>
        </div>

        {/* Certificates & Awards */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Sertifikalar & Ödüller</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-muted/30 rounded-lg p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">ISO 9001:2015</h3>
              <p className="text-sm text-muted-foreground">Kalite Yönetim Sistemi Sertifikası</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">TOBB Üyeliği</h3>
              <p className="text-sm text-muted-foreground">Türkiye Odalar ve Borsalar Birliği</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Best Stand Award</h3>
              <p className="text-sm text-muted-foreground">CNR Expo 2023 En İyi Stand Tasarımı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
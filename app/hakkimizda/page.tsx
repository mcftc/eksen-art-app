import { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { Building2, Users, Award, Target, Heart, Zap, Shield, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: `Hakkımızda | ${siteConfig.name}`,
  description: "Eksenart Mimarlık olarak 15+ yıllık deneyimle fuar standı tasarımı ve üretimi konusunda sektörün önde gelen firmalarından biriyiz. Vizyonumuz, misyonumuz ve değerlerimiz.",
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
    { number: "15+", label: "Yıllık Deneyim" },
    { number: "500+", label: "Tamamlanan Proje" },
    { number: "50+", label: "Farklı Sektör" },
    { number: "25+", label: "Ülke Deneyimi" }
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
            15+ yıllık deneyimimizle fuar standı tasarımı ve üretimi konusunda 
            sektörün önde gelen firmalarından biriyiz. Her projede mükemmellik 
            arayışımız ve müşteri memnuniyeti odaklı yaklaşımımızla tanınırız.
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
              Müşterilerimizin marka değerlerini en iyi şekilde yansıtan, yaratıcı ve 
              fonksiyonel fuar standları tasarlayarak, onların iş hedeflerine ulaşmalarına 
              destek olmak. Kaliteli hizmet anlayışı ve güvenilir çözümlerle sektörde 
              öncü bir rol üstlenmek.
            </p>
          </div>
          
          <div className="bg-primary/10 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Building2 className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Vizyonumuz</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Fuar standı tasarımı ve üretimi alanında Türkiye&apos;nin lider firması olarak, 
              uluslararası arenada da tanınan bir marka haline gelmek. Sürdürülebilir 
              tasarım anlayışı ve teknolojik yeniliklerle geleceğin fuarlarını şekillendirmek.
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

        {/* Company History */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Hikayemiz</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
            <p>
              <strong>2009 yılında</strong> kurulan Eksenart Mimarlık, fuar standı tasarımı alanında 
              kendini kanıtlamış bir ekip tarafından hayata geçirildi. İlk projelerimizden itibaren 
              kalite ve müşteri memnuniyetini ön planda tutarak sektörde hızla büyüdük.
            </p>
            <p>
              <strong>2015&apos;te</strong> uluslararası fuarlara açılarak Avrupa pazarında da hizmet 
              vermeye başladık. Almanya, İtalya, Fransa gibi ülkelerdeki prestijli fuarlarda 
              başarılı projeler gerçekleştirdik.
            </p>
            <p>
              <strong>2020 sonrası</strong> dijital dönüşüm süreciyle birlikte hizmet kalitemizi 
              artırdık. 3D modelleme, sanal tur teknolojileri ve sürdürülebilir tasarım 
              yaklaşımlarını iş süreçlerimize entegre ettik.
            </p>
            <p>
              <strong>Bugün</strong> 500&apos;den fazla başarılı projeye imza atarak, 50&apos;den fazla 
              farklı sektörden müşteriye hizmet vermenin gururunu yaşıyoruz.
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
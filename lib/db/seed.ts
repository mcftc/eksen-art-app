import { config } from 'dotenv'
import { db } from './index'
import { standTypes, services, projects } from './schema'

// Load environment variables
config({ path: '.env.local' })

const standTypesData = [
  {
    slug: 'ahsap',
    nameTr: 'Ahşap Stand',
    nameEn: 'Wooden Stand',
    descriptionTr: 'Premium kalite ahşap malzemelerle özel tasarım fuar standları',
    descriptionEn: 'Custom designed exhibition stands with premium quality wooden materials',
    features: ['Özel Tasarım', 'Premium Malzeme', 'Yüksek Dayanıklılık', 'Prestijli Görünüm'],
    materials: ['MDF', 'Sunta', 'Kontrplak', 'Masif Ahşap'],
    sizes: ['9m²', '12m²', '18m²', '24m²', '36m²', '50m²+'],
    leadTime: '15-20 iş günü',
    idealFor: 'Kurumsal firmalar, premium markalar, özel tasarım isteyenler',
    orderIndex: 1,
    metaTitle: 'Ahşap Fuar Standı Tasarımı ve İmalatı | Eksenart Mimarlık',
    metaDescription: 'Premium kalite ahşap malzemelerle özel tasarım fuar standları. Kurumsal firmalar için prestijli ve dayanıklı ahşap stand çözümleri.',
  },
  {
    slug: 'maxima',
    nameTr: 'Maxima Stand',
    nameEn: 'Maxima Stand',
    descriptionTr: 'Alüminyum profil sistemli modern ve esnek fuar standları',
    descriptionEn: 'Modern and flexible exhibition stands with aluminum profile system',
    features: ['Modüler Sistem', 'Hızlı Kurulum', 'Tekrar Kullanılabilir', 'Modern Tasarım'],
    materials: ['Alüminyum Profil', 'MDF Panel', 'Cam', 'LED Aydınlatma'],
    sizes: ['9m²', '12m²', '16m²', '20m²', '25m²', '30m²+'],
    leadTime: '10-15 iş günü',
    idealFor: 'Sık fuar katılımı yapan firmalar, modern görünüm isteyenler',
    orderIndex: 2,
    metaTitle: 'Maxima Fuar Standı Sistemi | Alüminyum Profil Stand',
    metaDescription: 'Modern alüminyum profil sistemli maxima fuar standları. Hızlı kurulum, tekrar kullanılabilir ve esnek tasarım seçenekleri.',
  },
  {
    slug: 'moduler',
    nameTr: 'Modüler Stand',
    nameEn: 'Modular Stand',
    descriptionTr: 'Değiştirilebilir ve uyarlanabilir modüler fuar standları',
    descriptionEn: 'Changeable and adaptable modular exhibition stands',
    features: ['Esnek Tasarım', 'Kolay Taşıma', 'Çevre Dostu', 'Maliyet Etkin'],
    materials: ['Modüler Panel Sistem', 'Alüminyum Konstrüksiyon', 'Vinil Kaplama'],
    sizes: ['4m²', '8m²', '12m²', '16m²', '20m²', '24m²+'],
    leadTime: '7-10 iş günü',
    idealFor: 'Çoklu fuar katılımcıları, değişken alan ihtiyacı olanlar',
    orderIndex: 3,
    metaTitle: 'Modüler Fuar Standı Sistemleri | Esnek Stand Çözümleri',
    metaDescription: 'Değiştirilebilir modüler fuar standları. Esnek tasarım, kolay taşıma ve çevre dostu malzemelerle maliyet etkin çözümler.',
  },
  {
    slug: 'paket',
    nameTr: 'Paket Stand',
    nameEn: 'Package Stand',
    descriptionTr: 'Ekonomik ve pratik hazır paket fuar standı çözümleri',
    descriptionEn: 'Economical and practical ready-made exhibition stand packages',
    features: ['Ekonomik', 'Hızlı Teslimat', 'Standart Ölçüler', 'Pratik Çözüm'],
    materials: ['Hafif Panel', 'Pop-up Sistem', 'Dijital Baskı', 'Portatif Aksesuarlar'],
    sizes: ['3m²', '6m²', '9m²', '12m²'],
    leadTime: '3-5 iş günü',
    idealFor: 'Startuplar, küçük işletmeler, düşük bütçeli katılımcılar',
    orderIndex: 4,
    metaTitle: 'Paket Fuar Standı | Ekonomik Stand Çözümleri',
    metaDescription: 'Ekonomik ve pratik paket fuar standları. Hızlı teslimat, standart ölçüler ve startup\'lar için uygun maliyetli çözümler.',
  },
]

const servicesData = [
  {
    slug: 'tasarim',
    nameTr: 'Tasarım',
    nameEn: 'Design',
    descriptionTr: '3D modelleme ve görselleştirme ile profesyonel stand tasarımı',
    descriptionEn: 'Professional stand design with 3D modeling and visualization',
    icon: 'Palette',
    features: ['3D Modelleme', 'Görselleştirme', 'Konsept Geliştirme', 'Teknik Çizim'],
    orderIndex: 1,
  },
  {
    slug: 'imalat',
    nameTr: 'İmalat',
    nameEn: 'Manufacturing',
    descriptionTr: 'Modern üretim tesisimizde kaliteli stand imalatı',
    descriptionEn: 'Quality stand manufacturing in our modern production facility',
    icon: 'Factory',
    features: ['Modern Tesis', 'Kalite Kontrol', 'Zamanında Teslimat', 'Uzman Ekip'],
    orderIndex: 2,
  },
  {
    slug: 'kurulum',
    nameTr: 'Kurulum',
    nameEn: 'Installation',
    descriptionTr: 'Deneyimli ekibimizle hızlı ve profesyonel kurulum',
    descriptionEn: 'Fast and professional installation with our experienced team',
    icon: 'Wrench',
    features: ['Profesyonel Ekip', 'Hızlı Kurulum', 'Güvenlik', 'Kalite Kontrol'],
    orderIndex: 3,
  },
  {
    slug: 'depolama',
    nameTr: 'Depolama',
    nameEn: 'Storage',
    descriptionTr: 'Güvenli ve organize stand depolama hizmetleri',
    descriptionEn: 'Safe and organized stand storage services',
    icon: 'Warehouse',
    features: ['Güvenli Depo', 'Organize Sistem', 'Envanter Takibi', 'Bakım Hizmeti'],
    orderIndex: 4,
  },
  {
    slug: 'baski',
    nameTr: 'Baskı',
    nameEn: 'Printing',
    descriptionTr: 'Yüksek kaliteli dijital baskı ve branding çözümleri',
    descriptionEn: 'High quality digital printing and branding solutions',
    icon: 'Printer',
    features: ['Dijital Baskı', 'Geniş Format', 'Kaliteli Malzeme', 'Hızlı Üretim'],
    orderIndex: 5,
  },
]

const projectsData = [
  {
    slug: 'cnr-expo-ahsap-stand-2024',
    title: 'CNR EXPO 2024 Ahşap Fuar Standı',
    clientName: 'TechCorp A.Ş.',
    location: 'İstanbul, Türkiye',
    eventName: 'CNR EXPO 2024',
    eventDate: '2024-03-15',
    sizeSqm: 36,
    description: 'Modern ahşap tasarım ile teknoloji sektörüne yönelik özel üretim fuar standı.',
    features: ['Premium Ahşap Malzeme', 'LED Aydınlatma', 'Interactive Demo Alanı', 'VIP Toplantı Odası'],
    images: ['/images/projects/cnr-expo-2024-1.jpg', '/images/projects/cnr-expo-2024-2.jpg'],
    isFeatured: true,
    viewCount: 0,
  },
  {
    slug: 'hannover-messe-maxima-stand',
    title: 'Hannover Messe Maxima Stand Projesi',
    clientName: 'IndusTech GmbH',
    location: 'Hannover, Almanya',
    eventName: 'Hannover Messe 2024',
    eventDate: '2024-04-22',
    sizeSqm: 25,
    description: 'Alüminyum profil sistemli modern maxima stand tasarımı.',
    features: ['Modüler Sistem', 'Hızlı Kurulum', 'Çok Fonksiyonlu Alanlar', 'Dijital Ekranlar'],
    images: ['/images/projects/hannover-messe-1.jpg', '/images/projects/hannover-messe-2.jpg'],
    isFeatured: true,
    viewCount: 0,
  },
]

async function seed() {
  try {
    console.log('🌱 Seeding database...')
    
    // Seed stand types
    console.log('📦 Seeding stand types...')
    for (const standType of standTypesData) {
      await db.insert(standTypes).values(standType).onConflictDoNothing()
    }
    
    // Seed services
    console.log('🔧 Seeding services...')
    for (const service of servicesData) {
      await db.insert(services).values(service).onConflictDoNothing()
    }
    
    // Seed projects
    console.log('🏗️ Seeding projects...')
    for (const project of projectsData) {
      await db.insert(projects).values(project).onConflictDoNothing()
    }
    
    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { seed }
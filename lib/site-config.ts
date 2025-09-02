export const siteConfig = {
    name: 'Eksenart Mimarlık',
    title: 'Eksenart Mimarlık | Mekansal Tasarım, Mimari Dekorasyon & Fuar Standı | Türkiye, Almanya & Global',
    description:
        'Eksenart Mimarlık – Mekansal tasarım, mimari dekorasyon, fuar standı proje uygulaması ve proje yönetimi konularında uzman. Türkiye ve Almanya atölyelerimizle global hizmetler. 10+ yıl deneyim.',
    keywords: [
        // Core service keywords
        'mekansal tasarım',
        'mimari dekorasyon',
        'proje yönetimi',
        'fuar standı tasarımı',
        'fuar standı imalatı',
        'fuar standı kurulumu',
        'tanıtım faaliyetleri',
        'proje organizasyonu',
        // Stand types
        'ahşap fuar standı',
        'maxima fuar standı',
        'modüler fuar standı',
        'paket fuar standı',
        // Value propositions
        'premium fuar standı',
        'kaliteli fuar standı',
        'sürdürülebilir fuar standı',
        'VIP fuar standı',
        // Ancillary services
        'fuar hostesi',
        'catering fuar hizmeti',
        // Geo modifiers
        'İstanbul fuar standı',
        'Türkiye fuar standı',
        'Almanya fuar standı',
        'Avrupa fuar standı',
        'Rusya fuar standı',
        'Orta Doğu fuar standı',
        'ABD fuar standı',
        // Brand
        'Eksenart Mimarlık'
    ],
    url: 'https://eksenart.com',
    ogImage: '/og-image.jpg', // Recommended: 1200x630px, optimized JPG/WEBP
    contact: {
        phone: '+90 530 120 41 82',
        email: 'info@eksenart.com',
        address: 'İstanbul, Türkiye',
        workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:00'
    },
    social: {
        instagram: 'https://instagram.com/eksenartmimarlik',
        linkedin: 'https://linkedin.com/company/eksenart',
        facebook: 'https://facebook.com/eksenartmimarlik',
        behance: 'https://behance.net/eksenart'
    },
    navigation: {
        main: [
            { name: 'Ana Sayfa', href: '/' },
            { 
                name: 'Stand Tipleri', 
                href: '/stand-tipleri',
                children: [
                    { name: 'Ahşap Stand', href: '/stand-tipleri/ahsap' },
                    { name: 'Maxima Stand', href: '/stand-tipleri/maxima' },
                    { name: 'Modüler Stand', href: '/stand-tipleri/moduler' },
                    { name: 'Paket Stand', href: '/stand-tipleri/paket' }
                ]
            },
            { 
                name: 'Hizmetlerimiz', 
                href: '/hizmetler',
                children: [
                    { name: 'Tasarım', href: '/hizmetler/tasarim' },
                    { name: 'İmalat', href: '/hizmetler/imalat' },
                    { name: 'Kurulum', href: '/hizmetler/kurulum' },
                    { name: 'Depolama', href: '/hizmetler/depolama' },
                    { name: 'Baskı', href: '/hizmetler/baski' }
                ]
            },
            { name: 'Projeler', href: '/projeler' },
            { name: 'Hakkımızda', href: '/hakkimizda' },
            { name: 'İletişim', href: '/iletisim' }
        ]
    },
    standTypes: {
        ahsap: {
            name: 'Ahşap Stand',
            description: 'Premium kalite ahşap malzemelerle özel tasarım fuar standları',
            features: ['Özel Tasarım', 'Premium Malzeme', 'Yüksek Dayanıklılık', 'Prestijli Görünüm']
        },
        maxima: {
            name: 'Maxima Stand',
            description: 'Alüminyum profil sistemli modern ve esnek fuar standları',
            features: ['Modüler Sistem', 'Hızlı Kurulum', 'Tekrar Kullanılabilir', 'Modern Tasarım']
        },
        moduler: {
            name: 'Modüler Stand',
            description: 'Değiştirilebilir ve uyarlanabilir modüler fuar standları',
            features: ['Esnek Tasarım', 'Kolay Taşıma', 'Çevre Dostu', 'Maliyet Etkin']
        },
        paket: {
            name: 'Paket Stand',
            description: 'Ekonomik ve pratik hazır paket fuar standı çözümleri',
            features: ['Ekonomik', 'Hızlı Teslimat', 'Standart Ölçüler', 'Pratik Çözüm']
        }
    },
    services: {
        tasarim: {
            name: 'Tasarım',
            description: '3D modelleme ve görselleştirme ile profesyonel stand tasarımı',
            icon: 'Palette'
        },
        imalat: {
            name: 'İmalat',
            description: 'Modern üretim tesisimizde kaliteli stand imalatı',
            icon: 'Factory'
        },
        kurulum: {
            name: 'Kurulum',
            description: 'Deneyimli ekibimizle hızlı ve profesyonel kurulum',
            icon: 'Wrench'
        },
        depolama: {
            name: 'Depolama',
            description: 'Güvenli ve organize stand depolama hizmetleri',
            icon: 'Warehouse'
        },
        baski: {
            name: 'Baskı',
            description: 'Yüksek kaliteli dijital baskı ve branding çözümleri',
            icon: 'Printer'
        }
    }
}

export type SiteConfig = typeof siteConfig

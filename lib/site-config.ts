export const siteConfig = {
    name: 'Eksenart Mimarlık',
    title: 'Eksenart | Premium Fuar Standı Tasarım ve Üretim | CNR, Tüyap, İFM | İstanbul',
    description:
        'Eksenart Mimarlık - 15+ yıllık deneyimle premium fuar standı tasarımı ve üretimi. Ahşap, Maxima, Modüler stand çözümleri. 500+ başarılı proje. Ücretsiz 3D tasarım, hızlı teslim. İstanbul merkezli, Türkiye ve Avrupa\'da hizmet.',
    keywords: [
        // High-value primary keywords
        'fuar standı',
        'fuar stand tasarımı',
        'fuar stand imalatı',
        'exhibition stand design',
        'stand kurulumu',
        
        // Stand types with commercial intent
        'ahşap fuar standı',
        'ahşap stand fiyatları',
        'maxima fuar standı',
        'maxima stand sistemleri',
        'modüler fuar standı',
        'modüler stand kiralama',
        'paket fuar standı',
        'hazır stand çözümleri',
        
        // Location-based keywords
        'İstanbul fuar standı',
        'CNR fuar standı',
        'Tüyap fuar standı',
        'İFM fuar standı',
        'Ankara fuar standı',
        'İzmir fuar standı',
        
        // Service keywords
        '3D stand tasarım',
        'stand proje',
        'stand üretimi',
        'stand montajı',
        'stand depolama',
        'dijital baskı hizmetleri',
        
        // Industry-specific
        'teknoloji fuarı standı',
        'gıda fuarı standı',
        'mobilya fuarı standı',
        'yapı fuarı standı',
        'sağlık fuarı standı',
        
        // Commercial intent
        'fuar standı fiyatları',
        'stand maliyeti',
        'fuar standı teklif',
        'ucuz fuar standı',
        'kaliteli fuar standı',
        
        // Brand terms
        'Eksenart',
        'Eksenart Mimarlık',
        'eksenart fuar standı'
    ],
    url: 'https://eksenart.com',
    ogImage: '/og-image.jpg',
    alternateUrls: {
        tr: 'https://eksenart.com/tr',
        en: 'https://eksenart.com/en'
    },
    contact: {
        phone: '+90 530 120 41 82',
        whatsapp: '905301204182',
        email: 'info@eksenart.com',
        address: 'Kısıklı Cad. No:23, Üsküdar, İstanbul, Türkiye',
        addressShort: 'İstanbul, Türkiye',
        workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
        coordinates: {
            lat: 41.0082,
            lng: 28.9784
        }
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

import { Metadata } from "next"
import { InstagramFeed } from "@/components/instagram-feed"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Instagram - Eksenart Mimarlık",
  description: "Eksenart Mimarlık'ın en son projelerini, stand tasarımlarını ve çalışmalarını Instagram'da keşfedin. Yaratıcı tasarımlar ve profesyonel çözümler.",
  keywords: "eksenart instagram, stand tasarımı, mimarlık projeleri, fuar standı, instagram galeri",
  openGraph: {
    title: "Instagram - Eksenart Mimarlık",
    description: "En son projelerimizi ve çalışmalarımızı Instagram'da takip edin.",
    url: `${siteConfig.url}/instagram`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Eksenart Mimarlık Instagram",
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Instagram - Eksenart Mimarlık",
    description: "En son projelerimizi ve çalışmalarımızı Instagram'da takip edin.",
    images: [siteConfig.ogImage],
  },
}

export default function InstagramPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Instagram
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ml-2">
                Galerimiz
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              En son projelerimizi, stand tasarımlarımızı ve çalışma süreçlerimizi Instagram hesabımızda paylaşıyoruz. 
              Yaratıcı tasarımlarımızı ve profesyonel çözümlerimizi keşfetmek için bizi takip edin.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <InstagramFeed 
            limit={24}
            columns={4}
            showCaption={true}
            showHeader={false}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">
            Projelerimizi Yakından Takip Edin
          </h2>
          <p className="text-lg text-muted-foreground">
            Instagram hesabımızda güncel projelerimizi, tasarım sürecimizi ve ekip çalışmalarımızı paylaşıyoruz. 
            Yeni projelerimizden haberdar olmak ve ilham almak için bizi takip etmeyi unutmayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.instagram.com/eksenartmimarlik/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram&apos;da Takip Et
            </a>
            <a
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium fuar standı tasarımı ve üretiminde Türkiye&apos;nin lider markası
            </p>
            <div className="flex space-x-4">
              {Object.entries(siteConfig.social).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={key}
                >
                  <span className="sr-only">{key}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stand Tipleri</h4>
            <ul className="space-y-2">
              {siteConfig.navigation.main[1].children?.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              {siteConfig.navigation.main[2].children?.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5" />
                <span>{siteConfig.contact.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
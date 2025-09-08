"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { StructuredData } from "./structured-data"

const pathNameMap: Record<string, string> = {
  "stand-tipleri": "Stand Tipleri",
  "hizmetler": "Hizmetlerimiz",
  "projeler": "Projeler",
  "hakkimizda": "Hakkımızda",
  "iletisim": "İletişim",
  "ahsap": "Ahşap Stand",
  "maxima": "Maxima Stand",
  "moduler": "Modüler Stand",
  "paket": "Paket Stand",
  "tasarim": "Tasarım",
  "imalat": "İmalat",
  "kurulum": "Kurulum",
  "depolama": "Depolama",
  "baski": "Baskı Hizmetleri",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on homepage
  if (pathname === "/") return null
  
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "https://eksenart.com" },
  ]
  
  let currentPath = ""
  segments.forEach((segment) => {
    currentPath += `/${segment}`
    const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbItems.push({
      name,
      url: `https://eksenart.com${currentPath}`,
    })
  })

  return (
    <>
      <StructuredData type="breadcrumb" data={{ items: breadcrumbItems }} />
      <nav 
        aria-label="Breadcrumb"
        className="container mx-auto px-4 py-3 text-sm"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link 
              href="/"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Ana Sayfa"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            const href = "/" + segments.slice(0, index + 1).join("/")
            const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
            
            return (
              <li key={segment} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {name}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
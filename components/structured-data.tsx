import Script from 'next/script'
import { STRUCTURED_DATA_ORG, FAQ_SCHEMA } from '@/lib/seo-constants'

interface BreadcrumbItem {
  name: string
  url: string
}

interface StructuredDataProps {
  type?: 'organization' | 'faq' | 'product' | 'service' | 'breadcrumb' | 'localBusiness'
  data?: {
    name?: string
    description?: string
    lowPrice?: string
    highPrice?: string
    offerCount?: string
    serviceType?: string
    items?: BreadcrumbItem[]
  }
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  let structuredData = {}

  switch (type) {
    case 'organization':
      structuredData = STRUCTURED_DATA_ORG
      break
      
    case 'faq':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_SCHEMA.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
      break
      
    case 'product':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data?.name || "Fuar Standı",
        description: data?.description || "Premium kalite fuar standı çözümleri",
        brand: {
          "@type": "Brand",
          name: "Eksenart",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "TRY",
          lowPrice: data?.lowPrice || "5000",
          highPrice: data?.highPrice || "50000",
          offerCount: data?.offerCount || "4",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
        },
      }
      break
      
    case 'service':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: data?.serviceType || "Fuar Standı Tasarım ve Üretim",
        provider: {
          "@type": "Organization",
          name: "Eksenart Mimarlık",
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "41.0082",
            longitude: "28.9784",
          },
          geoRadius: "2000",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Fuar Standı Hizmetleri",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Stand Tasarım",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Stand İmalat",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Stand Kurulum",
              },
            },
          ],
        },
      }
      break
      
    case 'breadcrumb':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data?.items?.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })) || [],
      }
      break
      
    case 'localBusiness':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Eksenart Mimarlık",
        image: "https://eksenart.com/logo.png",
        "@id": "https://eksenart.com",
        url: "https://eksenart.com",
        telephone: "+905301204182",
        priceRange: "₺₺₺",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kısıklı Cad. No:23",
          addressLocality: "Üsküdar",
          addressRegion: "İstanbul",
          postalCode: "34000",
          addressCountry: "TR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 41.0082,
          longitude: 28.9784,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        sameAs: [
          "https://www.instagram.com/eksenart",
          "https://www.linkedin.com/company/eksenart",
          "https://www.facebook.com/eksenart",
        ],
      }
      break
      
    default:
      structuredData = data || {}
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
      strategy="afterInteractive"
    />
  )
}
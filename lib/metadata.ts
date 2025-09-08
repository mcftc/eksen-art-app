import { Metadata } from 'next'
import { siteConfig } from './site-config'
import { SEO_TITLES, SEO_DESCRIPTIONS } from './seo-constants'

interface GenerateMetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article'
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
  noindex = false,
  type = 'website',
}: GenerateMetadataProps = {}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage
  
  const finalTitle = title || siteConfig.title
  const finalDescription = description || siteConfig.description
  const finalKeywords = [...new Set([...siteConfig.keywords, ...keywords])]

  return {
    title: {
      default: finalTitle,
      template: `%s | Eksenart`,
    },
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        'tr-TR': `${siteConfig.url}/tr${path}`,
        'en-US': `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      type,
      locale: 'tr_TR',
      alternateLocale: ['en_US'],
      url,
      title: finalTitle,
      description: finalDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
      creator: '@eksenart',
      site: '@eksenart',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your actual verification code
      yandex: 'your-yandex-verification-code',
    },
    category: 'business',
  }
}

// Specific metadata for different page types
export const pageMetadata = {
  home: generateSEOMetadata({
    title: SEO_TITLES.home,
    description: SEO_DESCRIPTIONS.home,
    keywords: ['fuar standı', 'exhibition stand', 'İstanbul fuar standı'],
  }),
  
  about: generateSEOMetadata({
    title: SEO_TITLES.about,
    description: SEO_DESCRIPTIONS.about,
    path: '/hakkimizda',
    keywords: ['eksenart hakkında', 'fuar standı firması', 'deneyimli stand üreticisi'],
  }),
  
  services: generateSEOMetadata({
    title: SEO_TITLES.services,
    description: SEO_DESCRIPTIONS.services,
    path: '/hizmetler',
    keywords: ['stand hizmetleri', 'fuar standı tasarım', 'stand kurulum'],
  }),
  
  projects: generateSEOMetadata({
    title: SEO_TITLES.projects,
    description: SEO_DESCRIPTIONS.projects,
    path: '/projeler',
    keywords: ['fuar standı örnekleri', 'stand projeleri', 'başarılı projeler'],
  }),
  
  contact: generateSEOMetadata({
    title: SEO_TITLES.contact,
    description: SEO_DESCRIPTIONS.contact,
    path: '/iletisim',
    keywords: ['fuar standı iletişim', 'teklif al', 'ücretsiz danışmanlık'],
  }),
}

// Dynamic metadata for stand types
export function getStandTypeMetadata(slug: string): Metadata {
  const standType = slug as keyof typeof SEO_TITLES.standTypes
  
  return generateSEOMetadata({
    title: SEO_TITLES.standTypes[standType] || `${slug} Stand | Eksenart`,
    description: SEO_DESCRIPTIONS.standTypes[standType] || SEO_DESCRIPTIONS.home,
    path: `/stand-tipleri/${slug}`,
    keywords: [`${slug} stand`, `${slug} fuar standı`, `${slug} stand fiyatları`],
    type: 'website',
  })
}

// Dynamic metadata for services
export function getServiceMetadata(slug: string): Metadata {
  const serviceName = slug.charAt(0).toUpperCase() + slug.slice(1)
  
  return generateSEOMetadata({
    title: `${serviceName} Hizmeti | Profesyonel Fuar Standı ${serviceName} | Eksenart`,
    description: `Eksenart profesyonel fuar standı ${slug} hizmeti. Deneyimli ekip, kaliteli malzeme, uygun fiyat. İstanbul ve tüm Türkiye'de hizmet.`,
    path: `/hizmetler/${slug}`,
    keywords: [`fuar standı ${slug}`, `stand ${slug}`, `profesyonel ${slug}`],
  })
}

// Dynamic metadata for projects
interface Project {
  title: string
  description?: string
  client_name?: string
  slug: string
  images?: Array<{ url: string }>
}

export function getProjectMetadata(project: Project): Metadata {
  const keywords: string[] = [project.title, 'fuar standı projesi']
  if (project.client_name) {
    keywords.push(project.client_name)
  }
  
  return generateSEOMetadata({
    title: `${project.title} | Fuar Standı Projesi | Eksenart`,
    description: project.description || `${project.title} fuar standı projesi. ${project.client_name || 'Müşterimiz'} için özel tasarım ve üretim. Eksenart kalitesiyle hayata geçirildi.`,
    path: `/projeler/${project.slug}`,
    keywords,
    image: project.images?.[0]?.url,
    type: 'article',
  })
}
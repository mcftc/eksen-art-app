import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eksenart.com'
  const currentDate = new Date()

  // Static pages with different priorities and update frequencies
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stand-tipleri`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Stand types - High priority for product pages
  const standTypes = [
    'ahsap-stand',
    'maxima-stand',
    'moduler-stand',
    'paket-stand',
  ].map(slug => ({
    url: `${baseUrl}/stand-tipleri/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  // Services - High priority for service pages
  const services = [
    'tasarim',
    'imalat',
    'kurulum',
    'depolama',
    'baski',
  ].map(slug => ({
    url: `${baseUrl}/hizmetler/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Add Turkish and English versions
  const allUrls = [...pages, ...standTypes, ...services]
  const multilingualUrls: MetadataRoute.Sitemap = []

  allUrls.forEach(item => {
    // Default URL
    multilingualUrls.push(item)
    
    // Turkish version
    multilingualUrls.push({
      ...item,
      url: item.url.replace(baseUrl, `${baseUrl}/tr`),
      priority: (item.priority ?? 0.5) * 0.95, // Slightly lower priority for language versions
    })
    
    // English version
    multilingualUrls.push({
      ...item,
      url: item.url.replace(baseUrl, `${baseUrl}/en`),
      priority: (item.priority ?? 0.5) * 0.9,
    })
  })

  return multilingualUrls
}
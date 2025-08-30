import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServiceBySlug, getServices } from "@/lib/data/services"
import { ServicePage } from "@/components/service-page"
import { siteConfig } from "@/lib/site-config"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // For static generation, use static data
  const staticServices = [
    { slug: 'tasarim' },
    { slug: 'imalat' },
    { slug: 'kurulum' },
    { slug: 'depolama' },
    { slug: 'baski' }
  ]
  
  return staticServices
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: 'Hizmet Bulunamadı | Eksenart Mimarlık',
      description: 'Aradığınız hizmet bulunamadı.',
    }
  }

  return {
    title: `${service.name_tr} Hizmeti | ${siteConfig.name}`,
    description: service.description_tr,
    keywords: [
      service.name_tr.toLowerCase(),
      `fuar standı ${service.name_tr.toLowerCase()}`,
      `stand ${service.name_tr.toLowerCase()}`,
      `${service.name_tr.toLowerCase()} hizmeti`,
      ...service.features || [],
    ],
    openGraph: {
      title: `${service.name_tr} Hizmeti | ${siteConfig.name}`,
      description: service.description_tr || siteConfig.description,
      type: 'website',
      url: `${siteConfig.url}/hizmetler/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return <ServicePage service={service} />
}
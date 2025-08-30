import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStandTypeBySlug, getStandTypes } from "@/lib/data/stand-types"
import { StandTypePage } from "@/components/stand-type-page"
import { siteConfig } from "@/lib/site-config"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // For static generation, use static data
  const staticStandTypes = [
    { slug: 'ahsap' },
    { slug: 'maxima' },
    { slug: 'moduler' },
    { slug: 'paket' }
  ]
  
  return staticStandTypes
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const standType = await getStandTypeBySlug(params.slug)

  if (!standType) {
    return {
      title: 'Stand Bulunamadı | Eksenart Mimarlık',
      description: 'Aradığınız stand tipi bulunamadı.',
    }
  }

  return {
    title: standType.meta_title || `${standType.name_tr} | ${siteConfig.name}`,
    description: standType.meta_description || standType.description_tr,
    keywords: [
      standType.name_tr.toLowerCase(),
      `${standType.name_tr.toLowerCase()} fuar standı`,
      `${standType.name_tr.toLowerCase()} stand tasarımı`,
      `${standType.name_tr.toLowerCase()} stand imalatı`,
      ...standType.features || [],
    ],
    openGraph: {
      title: standType.meta_title || `${standType.name_tr} | ${siteConfig.name}`,
      description: standType.meta_description || standType.description_tr || siteConfig.description,
      type: 'website',
      url: `${siteConfig.url}/stand-tipleri/${standType.slug}`,
    },
  }
}

export default async function StandTypeDetailPage({ params }: Props) {
  const standType = await getStandTypeBySlug(params.slug)

  if (!standType) {
    notFound()
  }

  return <StandTypePage standType={standType} />
}
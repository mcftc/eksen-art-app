import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProjectBySlug, getProjects } from "@/lib/data/projects"
import { ProjectPage } from "@/components/project-page"
import { siteConfig } from "@/lib/site-config"

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Proje Bulunamadı | Eksenart Mimarlık',
      description: 'Aradığınız proje bulunamadı.',
    }
  }

  // check null keywords first then set according to the keywords returned data
    const projectClient = project.client_name || "Müşteri"
    const projectEvent = project.event_name || "Etkinlik"
    const projectLocation = project.location || "Lokasyon"
    const description = project.description || "Fuar Standı"
    const imagesObj = project.images || []
    const images = imagesObj.length > 0 ? imagesObj : []



  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.description,
    keywords: [
      project.title.toLowerCase(),
        projectClient.toLowerCase(),
        projectEvent.toLowerCase(),
        projectLocation.toLowerCase(),
      "fuar standı",
      "stand tasarımı",
      ...project.features || [],
    ],
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description || siteConfig.description,
      type: 'website',
      url: `${siteConfig.url}/projeler/${project.slug}`,
      images: images.length > 0 ? [
        {
          url: images[0],
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectPage project={project} />
}
import { Metadata } from "next"
import Link from "next/link"
import { motion } from "framer-motion"
import { getProjects, getFeaturedProjects } from "@/lib/data/projects"
import { siteConfig } from "@/lib/site-config"
import { ProjectsGallery } from "@/components/projects-gallery"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: `Projelerimiz | ${siteConfig.name}`,
  description: "Gerçekleştirdiğimiz fuar standı projeleri. Ahşap, Maxima, Modüler ve Paket stand çözümlerimizden örnekler ve başarı hikayelerimiz.",
  keywords: [
    "fuar standı projeleri",
    "stand tasarım örnekleri",
    "gerçekleşen projeler",
    "fuar standı galeri",
    "başarı hikayeleri",
    "stand tasarım portföyü"
  ],
}

export default async function ProjectsPage() {
  // Get featured projects first, then regular projects
  const [featuredProjects, allProjects] = await Promise.all([
    getFeaturedProjects(6),
    getProjects()
  ])

  return (
    <div className="py-8">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Projelerimiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Türkiye ve Avrupa&apos;da gerçekleştirdiğimiz başarılı fuar standı projelerimizi keşfedin.
            Her sektörden markaları öne çıkaran yaratıcı tasarımlarımızla tanışın.
          </p>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Öne Çıkan Projeler</h2>
            <ProjectsGallery projects={featuredProjects} featured />
          </div>
        )}

        {allProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Tüm Projeler</h2>
            <ProjectsGallery projects={allProjects} />
          </div>
        )}

        {allProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Projeler yükleniyor veya henüz proje eklenmemiş.
            </p>
            <Link 
              href="/teklif-al"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              İlk Projenizi Başlatalım
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
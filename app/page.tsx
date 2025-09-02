import { HeroWithProjects } from "@/components/hero-with-projects"
import { StandTypesSection } from "@/components/stand-types-section"
import { ServicesSection } from "@/components/services-section"
import { CTASection } from "@/components/cta-section"
import { getStandTypes } from "@/lib/data/stand-types"
import { getServices } from "@/lib/data/services"
import { getFeaturedProjects } from "@/lib/data/projects"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  // Fetch data in parallel
  const [standTypes, services, featuredProjects] = await Promise.all([
    getStandTypes(),
    getServices(),
    getFeaturedProjects(8), // Get 8 featured projects for showcase
  ])

  return (
    <>
      <HeroWithProjects projects={featuredProjects} />
      <StandTypesSection standTypes={standTypes} />
      <ServicesSection services={services} />
      <CTASection />
    </>
  )
}
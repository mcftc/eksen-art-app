import { HeroSection } from "@/components/hero-section"
import { StandTypesSection } from "@/components/stand-types-section"
import { ServicesSection } from "@/components/services-section"
import { InstagramFeed } from "@/components/instagram-feed"
import { CTASection } from "@/components/cta-section"
import { getStandTypes } from "@/lib/data/stand-types"
import { getServices } from "@/lib/data/services"

export default async function Home() {
  // Fetch data in parallel
  const [standTypes, services] = await Promise.all([
    getStandTypes(),
    getServices(),
  ])

  return (
    <>
      <HeroSection />
      <StandTypesSection standTypes={standTypes} />
      <ServicesSection services={services} />
      
      {/* Instagram Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <InstagramFeed 
            limit={6}
            columns={3}
            showCaption={false}
            showHeader={true}
          />
        </div>
      </section>
      
      <CTASection />
    </>
  )
}
"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { CustomCursor } from "@/components/custom-cursor"
import { NoiseOverlay } from "@/components/noise-overlay"
import { ScrollProgress } from "@/components/scroll-progress"
import { BootSequence } from "@/components/boot-sequence"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />

      <AnimatePresence>{isLoading && <BootSequence onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />

          <main className="relative">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <FeaturedProjects onViewAll={() => {}} />
            <ContactSection />
          </main>
        </>
      )}
    </>
  )
}

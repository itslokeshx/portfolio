"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
import HeroOverlay from "@/features/hero/HeroOverlay";
import AboutHTML from "@/features/about/AboutHTML";
import SkillsHTML from "@/features/skills/SkillsHTML";
import ProjectsHTML from "@/features/projects/ProjectsHTML";

// Dynamic import for Scene to avoid SSR issues with Canvas
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="main-container">
      <Loader />
      <Scene />

      {/* HTML Content Overlay (Scrollable) */}
      <div className="content-overlay">
        <HeroOverlay />
        <AboutHTML />
        <SkillsHTML />
        <ProjectsHTML />
        {/* Sections will be added here */}
      </div>

      <style jsx>{`
        .main-container {
          width: 100vw;
          min-height: 100vh;
        }
        .content-overlay {
          position: relative;
          z-index: 10;
          pointer-events: none; /* Let clicks pass through to canvas by default */
        }
        /* Enable pointer events on interactive children */
        .content-overlay > * {
          pointer-events: auto;
        }
      `}</style>
    </main>
  );
}

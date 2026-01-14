'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import ParticleHero from '@/components/ParticleHero';
import NeuralAbout from '@/components/NeuralAbout';
import QuantumSkills from '@/components/QuantumSkills';
import HologramCarousel from '@/components/HologramCarousel';
import ProjectsGrid from '@/components/ProjectsGrid';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import NoiseOverlay from '@/components/NoiseOverlay';

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProjectsGrid, setShowProjectsGrid] = useState(false);

  useEffect(() => {
    // Simulate progressive loading
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setLoadingProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!isLoaded && (
        <Preloader progress={loadingProgress} isComplete={loadingProgress >= 100} />
      )}

      <SmoothScroll>
        <main className="relative">
          {/* Global Effects */}
          <CustomCursor />
          <NoiseOverlay />

          {/* Hero Section */}
          <ParticleHero />

          {/* About Section */}
          <NeuralAbout />

          {/* Skills Section */}
          <QuantumSkills />

          {/* Featured Projects */}
          <HologramCarousel onViewAll={() => setShowProjectsGrid(true)} />

          {/* Contact Section */}
          <Contact />

          {/* Projects Grid Modal */}
          <ProjectsGrid
            isOpen={showProjectsGrid}
            onClose={() => setShowProjectsGrid(false)}
          />
        </main>
      </SmoothScroll>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import HeroCanvas from '@/components/canvas/HeroCanvas';
import EducationCanvas from '@/components/canvas/EducationCanvas';
import SkillsCanvas from '@/components/canvas/SkillsCanvas';
import FeaturedProjects from '@/components/FeaturedProjects';
import Contact from '@/components/Contact';
import { getOptimalFrameCount } from '@/utils/deviceDetection';

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate progressive loading
    const totalFrames = getOptimalFrameCount(240) * 3;
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

      <main className="relative">
        {/* Hero Section - 0-20% scroll */}
        <HeroCanvas />

        {/* Education Section - 20-50% scroll */}
        <EducationCanvas />

        {/* Skills Section - 50-80% scroll */}
        <SkillsCanvas />

        {/* Featured Projects - 80-95% scroll */}
        <FeaturedProjects />

        {/* Contact Section - 95-100% scroll */}
        <Contact />
      </main>
    </>
  );
}

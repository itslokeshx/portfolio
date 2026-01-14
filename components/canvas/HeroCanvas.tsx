'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useImageSequence } from '@/hooks/useImageSequence';

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { canvasRef, isLoaded } = useImageSequence({
        folderPath: 'home',
        baseFrames: 240,
        scrollProgress: scrollYProgress,
    });

    // Text fade out: 0-15% scroll
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    // Scroll indicator fade out: 0-10% scroll
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ background: '#050505' }}
                />

                {/* Text Overlays */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h1 className="text-[12vw] md:text-[10vw] lg:text-[12vw] font-heading font-extrabold text-white mix-blend-exclusion leading-none">
                        LOKESH
                    </h1>
                    <p className="text-xl md:text-2xl font-inter text-cyan-400 mt-4 tracking-wide">
                        FULL STACK DEVELOPER | MERN STACK
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <div className="w-3 h-3 rounded-full bg-cyan-400 pulse-dot" />
                    <p className="text-sm font-mono text-cyan-400/70">Scroll to Explore</p>
                </motion.div>

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-void">
                        <div className="text-cyan-400 font-mono text-sm">Loading Hero...</div>
                    </div>
                )}
            </div>
        </div>
    );
}

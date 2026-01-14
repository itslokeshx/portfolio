'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useImageSequence } from '@/hooks/useImageSequence';

const educationData = [
    {
        year: 2026,
        badge: 'CURRENT',
        degree: 'B.E. Computer Science Engineering',
        institution: 'NIT Tiruchirappalli',
        isActive: true,
    },
    {
        year: 2022,
        title: 'Higher Secondary (HSC)',
        score: '92%',
        isActive: false,
    },
];

export default function EducationCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { canvasRef, isLoaded } = useImageSequence({
        folderPath: 'education',
        baseFrames: 240,
        scrollProgress: scrollYProgress,
        enabled: true,
    });

    // Card animations
    const card1X = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
    const card2X = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);
    const card1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
    const card2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ background: '#050505' }}
                />

                {/* Timeline Overlay */}
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
                        <div className="flex items-center gap-8 md:gap-16">
                            {/* Vertical Timeline */}
                            <div className="relative h-[400px] flex flex-col justify-around">
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400" />

                                {educationData.map((item, index) => (
                                    <div key={index} className="relative flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${item.isActive ? 'bg-cyan-400' : 'bg-gray-600'} relative z-10`} />
                                    </div>
                                ))}
                            </div>

                            {/* Education Cards */}
                            <div className="flex-1 flex flex-col gap-8">
                                {/* Card 1 */}
                                <motion.div
                                    style={{ x: card1X, opacity: card1Opacity }}
                                    className="glass rounded-xl p-6 max-w-md"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl font-heading font-bold text-white">
                                            {educationData[0].year}
                                        </span>
                                        <span className="px-3 py-1 bg-cyan-400/20 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-mono">
                                            {educationData[0].badge}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {educationData[0].degree}
                                    </h3>
                                    <p className="text-carbon">
                                        {educationData[0].institution}
                                    </p>
                                </motion.div>

                                {/* Card 2 */}
                                <motion.div
                                    style={{ x: card2X, opacity: card2Opacity }}
                                    className="glass rounded-xl p-6 max-w-md"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl font-heading font-bold text-white">
                                            {educationData[1].year}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {educationData[1].title}
                                    </h3>
                                    <p className="text-carbon">
                                        Score: {educationData[1].score}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-void">
                        <div className="text-cyan-400 font-mono text-sm">Loading Education...</div>
                    </div>
                )}
            </div>
        </div>
    );
}

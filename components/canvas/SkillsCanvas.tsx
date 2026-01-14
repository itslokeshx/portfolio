'use client';

import { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useImageSequence } from '@/hooks/useImageSequence';

const skillsData = {
    center: { name: 'JavaScript', icon: '⚡', radius: 0 },
    inner: [
        { name: 'React', icon: '⚛️', radius: 200 },
        { name: 'Node.js', icon: '🟢', radius: 200 },
        { name: 'Express', icon: '🚂', radius: 200 },
        { name: 'MongoDB', icon: '🍃', radius: 200 },
    ],
    outer: [
        { name: 'Tailwind CSS', icon: '🎨', radius: 320 },
        { name: 'Git', icon: '📦', radius: 320 },
        { name: 'Python', icon: '🐍', radius: 320 },
        { name: 'PHP', icon: '🐘', radius: 320 },
        { name: 'MySQL', icon: '🗄️', radius: 320 },
        { name: 'TypeScript', icon: '📘', radius: 320 },
    ],
};

interface SkillItemProps {
    skill: { name: string; icon: string; radius: number };
    index: number;
    total: number;
}

function SkillItem({ skill, index, total }: SkillItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const angle = (index / total) * 360;

    return (
        <motion.div
            className="absolute"
            style={{ rotate: angle }}
            animate={{ rotate: angle + 360 }}
            transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
            }}
            whileHover={{ scale: 1 }}
        >
            <div
                className="group relative"
                style={{
                    transform: `translateX(${skill.radius}px) rotate(-${angle}deg)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="w-16 h-16 rounded-full glass flex items-center justify-center cursor-pointer transition-all duration-300"
                    whileHover={{
                        scale: 1.25,
                        boxShadow: '0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 240, 255, 0.4)',
                    }}
                >
                    <span className="text-2xl">{skill.icon}</span>
                </motion.div>

                {/* Tooltip */}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-titanium/90 backdrop-blur-md border border-cyan-400/30 px-3 py-1 rounded-lg"
                    >
                        <p className="text-sm text-white font-medium">{skill.name}</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default function SkillsCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { canvasRef, isLoaded } = useImageSequence({
        folderPath: 'skills',
        baseFrames: 240,
        scrollProgress: scrollYProgress,
        enabled: true,
    });

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ background: '#050505' }}
                />

                {/* Skills Orbital System */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Center - JavaScript */}
                        <motion.div
                            className="relative z-10 w-32 h-32 rounded-full glass flex flex-col items-center justify-center"
                            animate={{
                                boxShadow: [
                                    '0 0 20px rgba(0, 240, 255, 0.4)',
                                    '0 0 40px rgba(0, 240, 255, 0.6)',
                                    '0 0 20px rgba(0, 240, 255, 0.4)',
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <span className="text-4xl mb-1">{skillsData.center.icon}</span>
                            <span className="text-sm font-bold text-white">{skillsData.center.name}</span>
                        </motion.div>

                        {/* Inner Orbit */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {skillsData.inner.map((skill, index) => (
                                <SkillItem
                                    key={skill.name}
                                    skill={skill}
                                    index={index}
                                    total={skillsData.inner.length}
                                />
                            ))}
                        </div>

                        {/* Outer Orbit */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {skillsData.outer.map((skill, index) => (
                                <SkillItem
                                    key={skill.name}
                                    skill={skill}
                                    index={index}
                                    total={skillsData.outer.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-void">
                        <div className="text-cyan-400 font-mono text-sm">Loading Skills...</div>
                    </div>
                )}
            </div>
        </div>
    );
}

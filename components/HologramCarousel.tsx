'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/utils/projectData';

interface HologramCarouselProps {
    onViewAll: () => void;
}

export default function HologramCarousel({ onViewAll }: HologramCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const featuredProjects = PROJECTS.filter(p => p.featured);

    const totalProjects = featuredProjects.length;
    const anglePerCard = (2 * Math.PI) / totalProjects;
    const radius = 600;

    return (
        <section className="relative min-h-screen bg-void py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-black text-center mb-20 font-heading"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-violet to-plasma">
                        FEATURED PROJECTS
                    </span>
                </motion.h2>

                {/* 3D Carousel */}
                <div
                    className="relative h-[700px] mb-12"
                    style={{
                        perspective: '2000px',
                        perspectiveOrigin: '50% 50%',
                    }}
                >
                    <div className="relative w-full h-full preserve-3d">
                        {featuredProjects.map((project, index) => {
                            const isActive = index === activeIndex;
                            const currentAngle = anglePerCard * (index - activeIndex);

                            const transform = `
                rotateY(${currentAngle * (180 / Math.PI)}deg)
                translateZ(${radius}px)
                ${isActive ? 'scale(1.2)' : 'scale(0.8)'}
              `;

                            return (
                                <motion.div
                                    key={project.id}
                                    className={`
                    absolute top-0 left-1/2 -translate-x-1/2
                    w-[90%] md:w-[500px] h-[600px]
                    cursor-pointer
                    transition-all duration-700
                    ${isActive ? 'z-10' : 'z-0'}
                  `}
                                    style={{
                                        transform,
                                        opacity: isActive ? 1 : 0.4,
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="
                    relative w-full h-full
                    bg-titanium/60 backdrop-blur-xl
                    border-2 border-cyan/30
                    rounded-3xl
                    overflow-hidden
                    shadow-[0_0_50px_rgba(0,240,255,0.2)]
                    group
                  ">
                                        {/* Scan Lines */}
                                        <div className="
                      absolute inset-0 pointer-events-none
                      bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.1)_2px,rgba(0,240,255,0.1)_4px)]
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                    " />

                                        {/* Glitch Effect */}
                                        {isActive && (
                                            <motion.div
                                                animate={{
                                                    x: [0, 2, -2, 0],
                                                    opacity: [1, 0.8, 1],
                                                }}
                                                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
                                                className="absolute inset-0 border-2 border-cyan/20 rounded-3xl"
                                            />
                                        )}

                                        {/* Content */}
                                        <div className="relative z-10 p-6 md:p-10 h-full flex flex-col">
                                            {/* Icon & Title */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="text-5xl md:text-6xl filter drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                                                    {project.icon}
                                                </div>
                                                <div>
                                                    <h3 className={`
                            text-3xl md:text-4xl font-black mb-1
                            text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}
                          `}>
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-sm text-cyan/70 uppercase tracking-widest">
                                                        {project.tagline}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-mist/80 leading-relaxed mb-6 text-sm md:text-base">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tech.map(tech => (
                                                    <span
                                                        key={tech}
                                                        className="
                              px-3 py-1
                              bg-cyan/10 border border-cyan/30
                              rounded-full
                              text-xs text-cyan
                              font-mono
                            "
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Features */}
                                            {project.features && (
                                                <div className="grid grid-cols-2 gap-2 mb-6">
                                                    {project.features.map(feat => (
                                                        <div key={feat} className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
                                                            <span className="text-xs text-carbon">{feat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Stats */}
                                            {project.stats && (
                                                <div className="grid grid-cols-3 gap-4 mb-6 mt-auto">
                                                    {Object.entries(project.stats).map(([key, value]) => (
                                                        <div key={key} className="text-center">
                                                            <div className="text-xl md:text-2xl font-black text-cyan">{value}</div>
                                                            <div className="text-xs text-carbon uppercase">{key}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* CTA Buttons */}
                                            <div className="flex gap-3">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                            flex-1 py-3 text-center
                            bg-gradient-to-r from-cyan to-plasma
                            text-void font-bold
                            rounded-xl
                            shadow-[0_0_30px_rgba(0,240,255,0.5)]
                            hover:shadow-[0_0_50px_rgba(0,240,255,0.8)]
                            transition-all duration-300
                            hover:scale-105
                          "
                                                >
                                                    View Code →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-6 mb-16">
                    <button
                        onClick={() => setActiveIndex((activeIndex - 1 + totalProjects) % totalProjects)}
                        className="
              w-14 h-14
              border-2 border-cyan
              rounded-full
              flex items-center justify-center
              text-cyan text-2xl
              hover:bg-cyan hover:text-void
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]
            "
                    >
                        ←
                    </button>

                    <div className="flex items-center gap-3">
                        {featuredProjects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                  h-3 rounded-full
                  transition-all duration-300
                  ${index === activeIndex
                                        ? 'bg-cyan w-12 shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                                        : 'bg-cyan/30 w-3 hover:bg-cyan/60'
                                    }
                `}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setActiveIndex((activeIndex + 1) % totalProjects)}
                        className="
              w-14 h-14
              border-2 border-cyan
              rounded-full
              flex items-center justify-center
              text-cyan text-2xl
              hover:bg-cyan hover:text-void
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]
            "
                    >
                        →
                    </button>
                </div>

                {/* View All CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={onViewAll}
                        className="
              px-8 py-4
              bg-gradient-to-r from-violet to-cyan
              text-void font-bold text-lg
              rounded-full
              shadow-[0_0_40px_rgba(157,0,255,0.5)]
              hover:shadow-[0_0_60px_rgba(157,0,255,0.8)]
              transition-all duration-300
              hover:scale-110
            "
                    >
                        ACCESS FULL ARCHIVE →
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

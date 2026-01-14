'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/utils/projectData';

interface HologramCarouselProps {
    onViewAll: () => void;
}

export default function HologramCarousel({ onViewAll }: HologramCarouselProps) {
    const featuredProjects = PROJECTS.filter(p => p.featured);

    return (
        <section className="relative bg-void py-20">
            <div className="container mx-auto px-6">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-violet to-plasma">
                            FEATURED PROJECTS
                        </span>
                    </h2>
                    <p className="text-carbon text-sm">
                        {featuredProjects.length} premium projects
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="
                                group
                                relative h-full
                                bg-gradient-to-br from-titanium/90 to-titanium/70
                                backdrop-blur-2xl
                                border-2 border-cyan/40
                                rounded-2xl
                                overflow-hidden
                                shadow-[0_10px_40px_rgba(0,0,0,0.3)]
                                hover:shadow-[0_20px_60px_rgba(0,240,255,0.2)]
                                hover:border-cyan/60
                                transition-all duration-500
                            ">
                                {/* Glass reflection */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                                {/* Scan lines */}
                                <div className="
                                    absolute inset-0 
                                    bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.02)_2px,rgba(0,240,255,0.02)_4px)]
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300
                                    pointer-events-none
                                " />

                                {/* Content */}
                                <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-5xl filter drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                                            {project.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`
                                                text-2xl md:text-3xl font-black mb-1
                                                text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}
                                            `}>
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-cyan/60 uppercase tracking-wider">
                                                {project.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-mist/70 leading-relaxed mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.slice(0, 5).map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="
                                                        px-2 py-1
                                                        bg-cyan/10 border border-cyan/30
                                                        rounded-md
                                                        text-[10px] text-cyan
                                                        font-mono
                                                    "
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    {project.features && (
                                        <div className="mb-4">
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {project.features.slice(0, 4).map((feat: string) => (
                                                    <div key={feat} className="flex items-center gap-1">
                                                        <div className="w-1 h-1 bg-cyan rounded-full flex-shrink-0" />
                                                        <span className="text-[10px] text-mist/60 truncate">{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats */}
                                    {project.stats && (
                                        <div className="mb-4 mt-auto">
                                            <div className="grid grid-cols-3 gap-2">
                                                {Object.entries(project.stats).map(([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="bg-void/40 border border-cyan/20 rounded-lg p-2 text-center"
                                                    >
                                                        <div className="text-lg font-black text-cyan">{value as string}</div>
                                                        <div className="text-[9px] text-carbon uppercase">{key}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            w-full py-2.5 text-center text-sm
                                            bg-gradient-to-r from-cyan to-plasma
                                            text-void font-bold
                                            rounded-lg
                                            shadow-[0_0_20px_rgba(0,240,255,0.3)]
                                            hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]
                                            hover:scale-[1.02]
                                            active:scale-95
                                            transition-all duration-300
                                            flex items-center justify-center gap-2
                                        "
                                    >
                                        View Project
                                        <span className="text-base">→</span>
                                    </a>
                                </div>

                                {/* Bottom glow */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <motion.button
                        onClick={onViewAll}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="
                            px-8 py-4
                            border-2 border-cyan
                            rounded-xl
                            text-cyan text-sm font-bold uppercase tracking-wider
                            hover:bg-cyan/10
                            transition-all duration-300
                            shadow-[0_0_30px_rgba(0,240,255,0.3)]
                            hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]
                        "
                    >
                        <span className="flex items-center gap-2">
                            Access Full Archive
                            <span className="text-lg">→</span>
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

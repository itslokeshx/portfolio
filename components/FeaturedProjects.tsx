'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCardFallback from './ProjectCardFallback';

const projects = [
    {
        title: 'Second Brain',
        stack: 'MERN Stack',
        description: 'Knowledge management system with offline-first architecture, markdown support, and sync across devices',
        tags: ['MERN', 'MongoDB', 'Offline-Sync', 'IndexedDB'],
        liveUrl: '#',
        codeUrl: '#',
    },
    {
        title: 'MemeHub',
        stack: 'React + API',
        description: 'Real-time meme discovery platform with trending content, infinite scroll, and social sharing',
        tags: ['React', 'REST API', 'Tailwind', 'Framer Motion'],
        liveUrl: '#',
        codeUrl: '#',
    },
    {
        title: 'YaaziCut',
        stack: 'Full Stack',
        description: 'URL shortener with analytics dashboard, custom link management, and QR code generation',
        tags: ['Node.js', 'Express', 'MongoDB', 'Chart.js'],
        liveUrl: '#',
        codeUrl: '#',
    },
];

export default function FeaturedProjects() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-void">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex gap-8 px-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="min-w-[800px] h-[500px] glass rounded-2xl overflow-hidden flex"
                            initial={{ opacity: 0.6, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Left Half - Mockup */}
                            <div className="w-1/2 bg-gradient-to-br from-cyan-400/5 to-plasma/5 flex items-center justify-center p-8">
                                <div className="relative w-full h-full">
                                    <ProjectCardFallback />
                                </div>
                            </div>

                            {/* Right Half - Info */}
                            <div className="w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-heading font-bold text-white mb-4">
                                        {project.title}
                                    </h3>

                                    {/* Tech Badges */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-mono"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-carbon leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.liveUrl}
                                        className="flex-1 px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg text-center hover:shadow-cyan-glow transition-all duration-300"
                                    >
                                        View Live
                                    </a>
                                    <a
                                        href={project.codeUrl}
                                        className="flex-1 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg text-center hover:bg-cyan-400/10 transition-all duration-300"
                                    >
                                        View Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/utils/projectData';
import Image from 'next/image';

interface HologramCarouselProps {
    onViewAll: () => void;
}

const projects = [
    {
        title: "Second Brain",
        category: "MERN STACK",
        image: "/assets/projects/second-brain.png",
        color: "#00F0FF" // Cyan
    },
    {
        title: "MemeHub",
        category: "SOCIAL PLATFORM",
        image: "/assets/projects/memehub.png",
        color: "#9D00FF" // Violet
    },
    {
        title: "WhatsApp API",
        category: "BACKEND SYSTEM",
        image: "/assets/projects/whatsapp.png",
        color: "#00FF94" // Neon Green
    },
    {
        title: "CV Application",
        category: "PRODUCTIVITY",
        image: "/assets/projects/cv-app.png",
        color: "#FF0055" // Neon Red
    },
];

export default function HologramCarousel({ onViewAll }: HologramCarouselProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cursor tracking with motion values (no re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth following
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <section className="relative bg-void py-20 overflow-hidden">
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
                    <p className="text-carbon text-sm font-mono">
                        [DATA_UPLINK] • Hover to project hologram
                    </p>
                </motion.div>

                {/* Desktop: Hover Reveal */}
                <div className="hidden md:block">
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative max-w-4xl mx-auto"
                    >
                        {/* Project List */}
                        <div className="space-y-1">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    className={`
                                        group relative
                                        border-l-2 border-transparent
                                        px-6 py-6
                                        cursor-pointer
                                        transition-all duration-300
                                        ${hoveredIndex === index
                                            ? 'border-l-2 bg-titanium/20'
                                            : 'hover:bg-titanium/10'
                                        }
                                    `}
                                    style={{
                                        borderLeftColor: hoveredIndex === index ? project.color : 'transparent',
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Left: Title */}
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={`
                                                    font-mono text-xs transition-all duration-300
                                                    ${hoveredIndex === index ? 'opacity-100' : 'opacity-40'}
                                                `}
                                                style={{
                                                    color: hoveredIndex === index ? project.color : '#94A3B8',
                                                }}
                                            >
                                                [DIR]
                                            </span>
                                            <h3 className={`
                                                text-2xl md:text-3xl font-bold
                                                transition-all duration-300
                                                ${hoveredIndex === index ? 'text-white' : 'text-carbon'}
                                            `}>
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Right: Category */}
                                        <span className={`
                                            font-mono text-xs uppercase tracking-wider
                                            transition-all duration-300
                                            ${hoveredIndex === index ? 'opacity-100' : 'opacity-40'}
                                        `}
                                            style={{
                                                color: hoveredIndex === index ? project.color : '#94A3B8',
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Glow line */}
                                    {hoveredIndex === index && (
                                        <motion.div
                                            layoutId="glow"
                                            className="absolute bottom-0 left-0 right-0 h-px"
                                            style={{
                                                background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                                                boxShadow: `0 0 10px ${project.color}`,
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating Holographic Preview */}
                        <AnimatePresence>
                            {hoveredIndex !== null && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'fixed',
                                        left: springX,
                                        top: springY,
                                        transform: 'translate(-50%, -50%)',
                                        pointerEvents: 'none',
                                        zIndex: 9999,
                                    }}
                                >
                                    <div
                                        className="
                                            relative w-[400px] h-[300px]
                                            rounded-xl overflow-hidden
                                            border-2
                                            shadow-2xl
                                        "
                                        style={{
                                            borderColor: projects[hoveredIndex].color,
                                            boxShadow: `0 0 40px ${projects[hoveredIndex].color}40`,
                                        }}
                                    >
                                        {/* Image Placeholder */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-titanium to-void flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-6xl mb-4">
                                                    {hoveredIndex === 0 && '🧠'}
                                                    {hoveredIndex === 1 && '😂'}
                                                    {hoveredIndex === 2 && '💬'}
                                                    {hoveredIndex === 3 && '📄'}
                                                </div>
                                                <p className="text-mist/60 text-sm font-mono">
                                                    {projects[hoveredIndex].title}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Scanline Overlay */}
                                        <div
                                            className="
                                                absolute inset-0
                                                bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.1)_2px,rgba(0,240,255,0.1)_4px)]
                                                animate-scan-line
                                                pointer-events-none
                                            "
                                        />

                                        {/* Glitch Effect */}
                                        <motion.div
                                            animate={{
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 0.15,
                                                repeat: Infinity,
                                                repeatDelay: 2,
                                            }}
                                            className="absolute inset-0 border-2"
                                            style={{
                                                borderColor: projects[hoveredIndex].color,
                                            }}
                                        />

                                        {/* Corner Brackets */}
                                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: projects[hoveredIndex].color }} />
                                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: projects[hoveredIndex].color }} />
                                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: projects[hoveredIndex].color }} />
                                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: projects[hoveredIndex].color }} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile: Card Stack */}
                <div className="md:hidden space-y-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="
                                bg-gradient-to-br from-titanium/90 to-titanium/70
                                backdrop-blur-xl
                                border-2
                                rounded-xl
                                overflow-hidden
                                shadow-lg
                            "
                            style={{
                                borderColor: `${project.color}40`,
                            }}
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-titanium to-void flex items-center justify-center">
                                <div className="text-6xl">
                                    {index === 0 && '🧠'}
                                    {index === 1 && '😂'}
                                    {index === 2 && '💬'}
                                    {index === 3 && '📄'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-mono text-xs" style={{ color: project.color }}>
                                        [DIR]
                                    </span>
                                    <span className="font-mono text-xs text-carbon uppercase">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {project.title}
                                </h3>
                                <a
                                    href="#"
                                    className="
                                        inline-block px-4 py-2 text-sm
                                        border-2 rounded-lg
                                        font-bold
                                        transition-all duration-300
                                        hover:bg-opacity-10
                                    "
                                    style={{
                                        borderColor: project.color,
                                        color: project.color,
                                    }}
                                >
                                    View Project →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-16">
                    <motion.button
                        onClick={onViewAll}
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

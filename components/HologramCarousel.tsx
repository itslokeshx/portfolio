"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HologramCarouselProps {
    onViewAll: () => void;
}

// PROJECT DATA
const projects = [
    {
        id: 1,
        title: "Second Brain",
        category: "MERN STACK",
        description: "A complete knowledge management system to store and organize thoughts. Features a self-hosted backend, offline-first sync architecture, and full data ownership.",
        stack: ["MongoDB", "Express", "React", "Node.js"],
        image: "/assets/projects/project-placeholder.png",
        color: "#00F0FF",
        github: "https://github.com/itslokeshx/Second-Brain",
        demo: "#"
    },
    {
        id: 2,
        title: "MemeHub",
        category: "SOCIAL PLATFORM",
        description: "A community-driven platform for sharing and discovering memes. Includes an infinite scroll feed, image optimization pipeline, and social engagement features.",
        stack: ["React", "Tailwind", "Cloudinary", "Framer"],
        image: "/assets/projects/project-placeholder.png",
        color: "#9D00FF",
        github: "https://github.com/itslokeshx/MemeHub",
        demo: "#"
    },
    {
        id: 3,
        title: "WhatsApp API",
        category: "BACKEND SYSTEM",
        description: "A robust Node.js backend to schedule and automate WhatsApp messages. Built for business loyalty programs to handle customer engagement automatically.",
        stack: ["Node.js", "REST API", "Cron Jobs", "Auth"],
        image: "/assets/projects/project-placeholder.png",
        color: "#00FF94",
        github: "https://github.com/itslokeshx/Automated-whatsapp-message",
        demo: "#"
    },
    {
        id: 4,
        title: "CV Application",
        category: "PRODUCTIVITY",
        description: "A real-time resume builder with a reactive drag-and-drop interface. Users can edit layouts live and export pixel-perfect PDFs instantly.",
        stack: ["React", "Vite", "Tailwind", "PDF.js"],
        image: "/assets/projects/project-placeholder.png",
        color: "#FF0055",
        github: "https://github.com/itslokeshx/CV-application",
        demo: "#"
    },
];

export default function HologramCarousel({ onViewAll }: HologramCarouselProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <p className="font-mono text-cyan/60 text-sm mb-4">// FEATURED_PROJECTS</p>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-300 tracking-tight">
                        FEATURED <span className="text-cyan">WORK</span>
                    </h2>
                </div>

                {/* Project List */}
                <div className="space-y-0">
                    {projects.map((project, index) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            index={index}
                            isExpanded={expandedIndex === index}
                            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        />
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
                        "
                    >
                        Access Full Archive →
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

// PROJECT ROW COMPONENT
interface ProjectRowProps {
    project: typeof projects[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}

function ProjectRow({ project, index, isExpanded, onToggle }: ProjectRowProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="border-b border-white/5">
            {/* Main Row */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onToggle}
                className="
                    group relative
                    py-8 px-4
                    cursor-pointer
                    transition-all duration-300
                    hover:bg-white/[0.02]
                "
            >
                <div className="flex items-center justify-between">
                    {/* Left: Index + Title + Preview Space */}
                    <div className="flex items-center gap-8">
                        <span className="font-mono text-sm text-slate-600 group-hover:text-cyan transition-colors">
                            0{index + 1}
                        </span>

                        {/* Title with reserved preview space */}
                        <div className="flex items-center gap-6">
                            <ShuffleText
                                text={project.title}
                                isActive={isHovered}
                                className="text-3xl md:text-5xl font-bold text-slate-400 group-hover:text-white transition-colors"
                            />

                            {/* Reserved Preview Space - always takes up space */}
                            <div className="w-32 h-24 flex-shrink-0">
                                <motion.div
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="
                                        w-full h-full
                                        rounded-lg
                                        overflow-hidden
                                        border-2
                                        shadow-lg
                                        bg-gradient-to-br from-titanium to-void
                                        flex items-center justify-center
                                        relative
                                    "
                                    style={{
                                        borderColor: project.color,
                                        boxShadow: isHovered ? `0 0 20px ${project.color}40` : 'none',
                                    }}
                                >
                                    {/* Preview Content */}
                                    {(project.image.startsWith('/') || project.image.startsWith('http')) ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-5xl">
                                            {project.image}
                                        </div>
                                    )}

                                    {/* Scanline overlay */}
                                    <div className="
                                        absolute inset-0
                                        bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.05)_2px,rgba(0,240,255,0.05)_4px)]
                                        pointer-events-none
                                        z-10
                                    " />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Category + Arrow */}
                    <div className="flex items-center gap-6">
                        <span
                            className="
                                hidden md:block
                                font-mono text-xs text-cyan/70 uppercase tracking-wider
                                opacity-0 -translate-x-4
                                group-hover:opacity-100 group-hover:translate-x-0
                                transition-all duration-500
                            "
                        >
                            [{project.category}]
                        </span>
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            className="text-xl text-slate-600 group-hover:text-cyan transition-colors"
                        >
                            →
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Expanded Dossier */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-8 pt-4 bg-white/[0.01]">
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                                {/* Left: Description */}
                                <div>
                                    <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono">
                                        // DESCRIPTION
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Right: Tech + Links */}
                                <div className="space-y-6">
                                    {/* Tech Stack */}
                                    <div>
                                        <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono">
                                            // TECH_STACK
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="
                                                        px-3 py-1
                                                        bg-cyan/10 border border-cyan/30
                                                        rounded-md
                                                        text-xs text-cyan font-mono
                                                    "
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="
                                                flex items-center gap-2
                                                px-4 py-2
                                                border border-cyan/40
                                                rounded-lg
                                                text-xs text-cyan
                                                hover:bg-cyan/10
                                                transition-all duration-300
                                            "
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="
                                                flex items-center gap-2
                                                px-4 py-2
                                                bg-gradient-to-r from-cyan to-violet
                                                rounded-lg
                                                text-xs text-void font-bold
                                                hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]
                                                transition-all duration-300
                                            "
                                        >
                                            Live Demo
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// SHUFFLE TEXT COMPONENT (FASTER)
interface ShuffleTextProps {
    text: string;
    isActive: boolean;
    className?: string;
}

function ShuffleText({ text, isActive, className }: ShuffleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        if (!isActive) {
            setDisplayText(text);
            return;
        }

        let frame = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (frame > index) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            // Accelerate: Reveal 3 characters per frame for super fast 1/3 sec feel
            frame += 3;

            if (frame > text.length + 5) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, 30); // 30ms with +3 increment = ~300ms total for typical titles

        return () => clearInterval(interval);
    }, [isActive, text]);

    return <h3 className={className}>{displayText}</h3>;
}

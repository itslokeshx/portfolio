"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HologramCarouselProps {
    onViewAll: () => void;
}

// --- FULL PROJECT DATA ---
const featuredProjects = [
    {
        id: 1,
        title: "Second Brain",
        category: "MERN STACK",
        description: "A complete knowledge management system to store, organize, and retrieve thoughts efficiently.",
        stack: ["MongoDB", "Express", "React", "Node.js"],
        image: "/assets/projects/project-placeholder.png",
        color: "#00F0FF",
        github: "https://github.com/itslokeshx/Second-Brain",
        demo: "#"
    },
    {
        id: 2,
        title: "MemeHub",
        category: "MERN STACK",
        description: "A social platform for sharing and discovering memes with a community-driven feed.",
        stack: ["React", "Express", "MongoDB", "Tailwind"],
        image: "/assets/projects/project-placeholder.png",
        color: "#9D00FF",
        github: "https://github.com/itslokeshx/MemeHub",
        demo: "#"
    },
    {
        id: 3,
        title: "WhatsApp API",
        category: "NODE.JS",
        description: "A backend system to schedule & automate WhatsApp messages for business loyalty programs.",
        stack: ["Node.js", "Express", "REST API"],
        image: "/assets/projects/project-placeholder.png",
        color: "#00FF94",
        github: "https://github.com/itslokeshx/Automated-whatsapp-message",
        demo: "#"
    },
    {
        id: 4,
        title: "SaveMyTab",
        category: "CHROME EXT",
        description: "A browser extension to save and organize active tabs to boost productivity.",
        stack: ["JavaScript", "Chrome API", "HTML/CSS"],
        image: "/assets/projects/project-placeholder.png",
        color: "#FF9F00",
        github: "https://github.com/itslokeshx/SaveMyTab",
        demo: "#"
    },
    {
        id: 5,
        title: "CV Application",
        category: "REACT",
        description: "A dynamic resume builder application allowing real-time editing and preview.",
        stack: ["React", "Vite", "Tailwind"],
        image: "/assets/projects/project-placeholder.png",
        color: "#FF0055",
        github: "https://github.com/itslokeshx/CV-application",
        demo: "#"
    },
];

const allProjects = [
    ...featuredProjects,
    {
        id: 6,
        title: "Travel Journal",
        category: "REACT",
        description: "A digital travel diary built with React components.",
        stack: ["React", "HTML", "CSS"],
        image: "/assets/projects/project-placeholder.png",
        color: "#61DAFB",
        github: "https://github.com/itslokeshx/Travel-journal",
        demo: "#"
    },
    {
        id: 7,
        title: "Business Card",
        category: "REACT",
        description: "A digital business card portfolio component.",
        stack: ["React", "CSS"],
        image: "/assets/projects/project-placeholder.png",
        color: "#61DAFB",
        github: "https://github.com/itslokeshx/Business-card",
        demo: "#"
    },
    {
        id: 8,
        title: "YaaziCut",
        category: "TYPESCRIPT",
        description: "Desktop Video Editor utility built with Electron & TypeScript.",
        stack: ["Electron", "TypeScript", "Node.js"],
        image: "/assets/projects/project-placeholder.png",
        color: "#3178C6",
        github: "https://github.com/itslokeshx/YaaziCut",
        demo: "#"
    },
    {
        id: 9,
        title: "QR Code Gen",
        category: "NODE.JS",
        description: "Generate QR codes programmatically using Node.js.",
        stack: ["Node.js", "Inquirer"],
        image: "/assets/projects/project-placeholder.png",
        color: "#68A063",
        github: "https://github.com/itslokeshx/QR-Code-Generator",
        demo: "#"
    },
    {
        id: 10,
        title: "Github Users",
        category: "NODE.JS",
        description: "Fetch and display user data using GitHub API.",
        stack: ["Node.js", "Axios", "GitHub API"],
        image: "/assets/projects/project-placeholder.png",
        color: "#68A063",
        github: "https://github.com/itslokeshx/Github_user_details",
        demo: "#"
    },
    {
        id: 11,
        title: "Advice Gen",
        category: "NODE.JS",
        description: "API integration project fetching random advice.",
        stack: ["Node.js", "API"],
        image: "/assets/projects/project-placeholder.png",
        color: "#68A063",
        github: "https://github.com/itslokeshx/Advice-Generator",
        demo: "#"
    },
    {
        id: 12,
        title: "Cat Meme App",
        category: "JAVASCRIPT",
        description: "Interactive meme generator application.",
        stack: ["JavaScript", "HTML", "CSS"],
        image: "/assets/projects/project-placeholder.png",
        color: "#F7DF1E",
        github: "https://github.com/itslokeshx/Cat-Meme-App",
        demo: "#"
    },
    {
        id: 13,
        title: "Otakumens",
        category: "JAVASCRIPT",
        description: "Anime discovery and listing application.",
        stack: ["JavaScript", "API"],
        image: "/assets/projects/project-placeholder.png",
        color: "#F7DF1E",
        github: "https://github.com/itslokeshx/otakumens",
        demo: "#"
    },
    {
        id: 14,
        title: "Ordering App",
        category: "JAVASCRIPT",
        description: "Food ordering system simulated interface.",
        stack: ["JavaScript", "DOM"],
        image: "/assets/projects/project-placeholder.png",
        color: "#F7DF1E",
        github: "https://github.com/itslokeshx/ordering-app",
        demo: "#"
    },
    {
        id: 15,
        title: "MindfulAI",
        category: "PYTHON",
        description: "AI-based project focused on mindfulness/mental health.",
        stack: ["Python", "AI/ML"],
        image: "/assets/projects/project-placeholder.png",
        color: "#3776AB",
        github: "https://github.com/itslokeshx/mindfulAI",
        demo: "#"
    },
    {
        id: 16,
        title: "Hostel Mgmt",
        category: "PHP & SQL",
        description: "Full management system for hostel allocation.",
        stack: ["PHP", "MySQL", "HTML"],
        image: "/assets/projects/project-placeholder.png",
        color: "#777BB4",
        github: "https://github.com/itslokeshx/hostelmanagement",
        demo: "#"
    },
    {
        id: 17,
        title: "Tesla Clone",
        category: "HTML/CSS",
        description: "Pixel-perfect clone of Tesla's homepage.",
        stack: ["HTML", "CSS"],
        image: "/assets/projects/project-placeholder.png",
        color: "#E34F26",
        github: "https://github.com/itslokeshx/Tesla",
        demo: "#"
    },
    {
        id: 18,
        title: "News Home",
        category: "HTML/CSS",
        description: "Responsive news layout with complex CSS Grid.",
        stack: ["HTML", "CSS Grid"],
        image: "/assets/projects/project-placeholder.png",
        color: "#E34F26",
        github: "https://github.com/itslokeshx/News-Homepage",
        demo: "#"
    },
    {
        id: 19,
        title: "Newsletter Sub",
        category: "HTML/CSS",
        description: "Form validation and layout design.",
        stack: ["HTML", "CSS", "JS"],
        image: "/assets/projects/project-placeholder.png",
        color: "#E34F26",
        github: "https://github.com/itslokeshx/Newsletter-Subscription",
        demo: "#"
    }
];

export default function HologramCarousel({ onViewAll }: HologramCarouselProps) {
    const [expandedFeatured, setExpandedFeatured] = useState<number | null>(null);
    const [showArchive, setShowArchive] = useState(false);
    const [isArchiveTriggerHovered, setIsArchiveTriggerHovered] = useState(false);
    const [activeFilter, setActiveFilter] = useState("ALL");

    // Extract unique categories for filter tabs
    const categories = ["ALL", "MERN STACK", "REACT", "NODE.JS", "JAVASCRIPT", "TYPESCRIPT", "PYTHON", "PHP & SQL", "HTML/CSS"];

    // Filter projects based on active tab
    const filteredProjects = activeFilter === "ALL"
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter);

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

                {/* FEATURED PROJECTS LIST */}
                <div className="space-y-0 mb-16">
                    {featuredProjects.map((project, index) => (
                        <ProjectRow
                            key={`featured-${project.id}`}
                            project={project}
                            index={index}
                            isExpanded={expandedFeatured === index}
                            onToggle={() => {
                                // If opening a project, close the archive
                                if (expandedFeatured !== index) {
                                    setShowArchive(false);
                                }
                                setExpandedFeatured(expandedFeatured === index ? null : index);
                            }}
                        />
                    ))}
                </div>

                {/* ALL ARCHIVES TRIGGER */}
                <div className="border-t border-b border-white/5 bg-[#050505] relative z-20">
                    <div
                        onMouseEnter={() => setIsArchiveTriggerHovered(true)}
                        onMouseLeave={() => setIsArchiveTriggerHovered(false)}
                        onClick={() => {
                            // If opening archive, close any expanded project
                            if (!showArchive) {
                                setExpandedFeatured(null);
                            }
                            setShowArchive(!showArchive);
                        }}
                        className={`
                            group relative
                            py-8 px-4
                            cursor-pointer
                            transition-all duration-300
                            ${showArchive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <span className={`font-mono transition-colors text-sm ${showArchive || isArchiveTriggerHovered ? 'text-cyan' : 'text-slate-600'}`}>
                                    // ARCHIVE
                                </span>
                                <ShuffleText
                                    text="VIEW FULL DATABASE"
                                    isActive={isArchiveTriggerHovered}
                                    className={`
                                        font-bold transition-colors text-3xl md:text-5xl
                                        ${showArchive || isArchiveTriggerHovered ? 'text-white' : 'text-slate-400'}
                                    `}
                                />
                            </div>
                            <motion.div
                                animate={{ rotate: showArchive ? 180 : 0 }}
                                className={`text-xl transition-colors ${showArchive || isArchiveTriggerHovered ? 'text-cyan' : 'text-slate-600'}`}
                            >
                                ↓
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* ARCHIVE GRID SECTION */}
                <AnimatePresence>
                    {showArchive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden bg-[#0a0a0a]"
                        >
                            <div className="px-4 py-12">
                                {/* Filter Tabs */}
                                <div className="flex flex-wrap gap-4 mb-16">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            className={`
                                                px-6 py-3 rounded-full text-sm font-bold font-mono border transition-all duration-300
                                                uppercase tracking-wide
                                                ${activeFilter === cat
                                                    ? "bg-cyan text-black border-cyan shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                                                    : "bg-transparent border-white/10 text-slate-500 hover:border-cyan/50 hover:text-cyan"}
                                            `}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Link to Archive Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((project) => (
                                        <ArchiveCard key={`archive-${project.id}`} project={project} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

// --- SUB COMPONENTS ---

// 1. FEATURED PROJECT ROW (With large image expand)
interface ProjectRowProps {
    project: any;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    size?: "large" | "small";
}

function ProjectRow({ project, index, isExpanded, onToggle, size = "large" }: ProjectRowProps) {
    const [isHovered, setIsHovered] = useState(false);

    // User requested "Same size" for both Archive ("small") and featured
    // So we use the large text size for both.

    return (
        <div className="border-b border-white/5">
            {/* Clickable Header */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onToggle}
                className={`
                    group relative
                    py-8 px-4
                    cursor-pointer
                    transition-all duration-300
                    ${isExpanded ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}
                `}
            >
                <div className="flex items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-8">
                        <span className={`font-mono transition-colors text-sm ${isExpanded || isHovered ? 'text-cyan' : 'text-slate-600'}`}>
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span>

                        <div className="flex items-center gap-6">
                            <ShuffleText
                                text={project.title}
                                isActive={isHovered} // Enabled shuffle even when expanded
                                className={`
                                    font-bold transition-colors text-3xl md:text-5xl
                                    ${isExpanded || isHovered ? 'text-white' : 'text-slate-400'}
                                `}
                            />

                            {/* Preview Thumbnail - Visible on Hover ONLY if NOT expanded */}
                            <div className="w-32 h-24 flex-shrink-0">
                                <motion.div
                                    animate={{ opacity: (isHovered && !isExpanded) ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="
                                        w-full h-full
                                        rounded overflow-hidden
                                        border border-white/10
                                        bg-white/5
                                        relative
                                    "
                                    style={{
                                        borderColor: (isHovered && !isExpanded) ? project.color : 'transparent',
                                        boxShadow: (isHovered && !isExpanded) ? `0 0 15px ${project.color}20` : 'none',
                                    }}
                                >
                                    {(project.image.startsWith('/') || project.image.startsWith('http')) ? (
                                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xl">{project.image}</div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block font-mono text-cyan/50 tracking-wider text-xs">
                            {project.category}
                        </span>
                        <motion.div
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            className={`transition-colors text-2xl ${isExpanded || isHovered ? 'text-cyan' : 'text-slate-600'}`}
                        >
                            +
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Expanded Details with Side-by-Side Layout */}
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
                            <div className="grid md:grid-cols-12 gap-8 items-start">
                                {/* Left: Project Image (Contained) */}
                                <div className="md:col-span-5">
                                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative group bg-black/50">
                                        {(project.image.startsWith('/') || project.image.startsWith('http')) ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-4xl">
                                                {project.image}
                                            </div>
                                        )}
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                                    </div>
                                </div>

                                {/* Right: Details & Actions */}
                                <div className="md:col-span-7 flex flex-col gap-6">
                                    <div>
                                        <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono border-b border-cyan/20 pb-2 inline-block">
                                            // DOSSIER
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                                                // TECHNOLOGY_MATRIX
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.stack.map((tech: string) => (
                                                    <span key={tech} className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-cyan hover:bg-cyan/10 transition-colors">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-2">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                className="
                                                    px-5 py-2.5
                                                    border border-white/10 bg-white/[0.02] rounded-lg
                                                    hover:bg-white/10 hover:border-cyan/50 text-slate-200
                                                    text-xs font-bold font-mono tracking-wide
                                                    flex items-center gap-2 transition-all group/btn
                                                "
                                            >
                                                <svg className="w-4 h-4 text-slate-400 group-hover/btn:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                SOURCE_CODE
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                className="
                                                    px-5 py-2.5
                                                    bg-cyan text-black rounded-lg
                                                    hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]
                                                    text-xs font-bold font-mono tracking-wide
                                                    flex items-center gap-2 transition-all
                                                "
                                            >
                                                LIVE_DEPLOY
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </a>
                                        </div>
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

// 2. ARCHIVE CARD (Grid Item)
function ArchiveCard({ project }: { project: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-cyan/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col h-full"
        >
            {/* Card Image */}
            <div className="h-48 w-full relative overflow-hidden bg-black/50">
                {(project.image.startsWith('/') || project.image.startsWith('http')) ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">{project.image}</div>
                )}

                {/* Overlay Links - Appear on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <a href={project.github} target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-cyan hover:text-black text-white transition-colors" title="View Code">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a href={project.demo} target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-cyan hover:text-black text-white transition-colors" title="Live Demo">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan transition-colors">{project.title}</h3>
                    <span className="text-[10px] font-mono text-cyan/70 border border-cyan/20 px-2 py-1 rounded">{project.category}</span>
                </div>

                <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
                            {tech}
                        </span>
                    ))}
                    {project.stack.length > 3 && (
                        <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">+{project.stack.length - 3}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// SHUFFLE TEXT COMPONENT
function ShuffleText({ text, isActive, className }: { text: string; isActive: boolean; className?: string }) {
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
                text.split("").map((char, index) => {
                    if (char === " ") return " ";
                    if (frame > index) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            frame += 1;
            if (frame > text.length + 5) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isActive, text]);

    return <h3 className={className}>{displayText}</h3>;
}

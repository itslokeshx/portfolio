'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, CATEGORIES } from '@/utils/projectData';

interface ProjectsGridProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectsGrid({ isOpen, onClose }: ProjectsGridProps) {
    const matrixRef = useRef<HTMLCanvasElement>(null);
    const [filter, setFilter] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // Matrix rain effect
    useEffect(() => {
        if (!isOpen) return;

        const canvas = matrixRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = Math.floor(canvas.width / 14);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
            ctx.font = '14px monospace';

            for (let i = 0; i < columns; i++) {
                const char = String.fromCharCode(0x30A0 + Math.random() * 96);
                const x = i * 14;
                const y = drops[i];

                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i] += 14;
            }
        };

        const interval = setInterval(drawMatrix, 50);

        return () => clearInterval(interval);
    }, [isOpen]);

    const filteredProjects = PROJECTS.filter(p => {
        const matchesFilter = filter === 'ALL' || p.category === filter;
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-6"
                >
                    {/* Matrix Rain Background */}
                    <canvas
                        ref={matrixRef}
                        className="absolute inset-0 opacity-30"
                    />

                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-void/90 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        className="
              relative z-10
              w-full max-w-7xl max-h-[90vh]
              bg-titanium/80 backdrop-blur-2xl
              border-2 border-cyan
              rounded-3xl
              overflow-hidden
              shadow-[0_0_100px_rgba(0,240,255,0.5)]
            "
                    >
                        {/* Header */}
                        <div className="
              sticky top-0 z-20
              bg-titanium/90 backdrop-blur-md
              border-b border-cyan/30
              p-6 md:p-8
            ">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black text-cyan mb-2 font-heading">
                                        PROJECT ARCHIVE
                                    </h2>
                                    <p className="text-carbon">
                                        {filteredProjects.length} projects indexed
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="
                    w-12 h-12
                    border-2 border-cyan
                    rounded-full
                    text-cyan text-2xl
                    hover:bg-cyan hover:text-void
                    transition-all duration-300
                  "
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="
                    w-full
                    bg-void/50 border border-cyan/30
                    rounded-xl px-6 py-4
                    text-mist placeholder:text-carbon
                    focus:border-cyan focus:outline-none
                    font-mono
                  "
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan">
                                    🔍
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex gap-3 flex-wrap">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`
                      px-5 py-2
                      border-2 rounded-full
                      font-mono text-sm
                      transition-all duration-300
                      ${filter === cat
                                                ? 'bg-cyan border-cyan text-void shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                                                : 'border-cyan/30 text-cyan hover:border-cyan/60'
                                            }
                    `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-280px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects.map((project, index) => (
                                    <motion.a
                                        key={project.id}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <div className="
                      relative
                      bg-void/50 backdrop-blur-md
                      border border-cyan/20
                      rounded-2xl
                      p-6
                      hover:border-cyan/60
                      hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]
                      transition-all duration-300
                      cursor-pointer
                      overflow-hidden
                    ">
                                            {/* Glitch Effect on Hover */}
                                            <motion.div
                                                className="
                          absolute inset-0
                          bg-gradient-to-br from-cyan/10 to-transparent
                          opacity-0 group-hover:opacity-100
                          transition-opacity
                        "
                                            />

                                            {/* Content */}
                                            <div className="relative z-10">
                                                {/* Header Row */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="
                            px-3 py-1
                            bg-cyan/10 border border-cyan/30
                            rounded-full
                            text-xs text-cyan font-mono
                          ">
                                                        {project.category}
                                                    </span>
                                                    {project.featured && (
                                                        <span className="text-xs text-gold">★ Featured</span>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h3 className="
                          text-2xl font-black text-mist mb-2
                          group-hover:text-cyan
                          transition-colors
                        ">
                                                    {project.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm text-carbon mb-4 line-clamp-2">
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack */}
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.slice(0, 3).map(tech => (
                                                        <span
                                                            key={tech}
                                                            className="
                                px-2 py-1
                                bg-titanium border border-cyan/20
                                rounded text-xs text-cyan/70
                              "
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.tech.length > 3 && (
                                                        <span className="px-2 py-1 text-xs text-carbon">
                                                            +{project.tech.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Hover Arrow */}
                                                <div className="
                          absolute bottom-4 right-4
                          text-cyan text-2xl
                          opacity-0 group-hover:opacity-100
                          transform translate-x-2 group-hover:translate-x-0
                          transition-all duration-300
                        ">
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {filteredProjects.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-carbon text-lg">No projects match your search</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

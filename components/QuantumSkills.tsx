'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/utils/projectData';

// Helper function to get related projects for a skill
const getRelatedProjects = (skillName: string): string[] => {
    const skillMap: { [key: string]: string[] } = {
        'React': ['Second Brain', 'MemeHub', 'CV Application'],
        'Node.js': ['Second Brain', 'MemeHub', 'Automated WhatsApp API'],
        'MongoDB': ['Second Brain', 'MemeHub'],
        'Express': ['Second Brain', 'Automated WhatsApp API'],
        'TypeScript': ['YaaziCut', 'Portfolio v3'],
        'Tailwind': ['MemeHub', 'CV Application', 'Portfolio v3'],
        'Git': ['All Projects'],
        'Python': ['MindfulAI'],
        'Next.js': ['Portfolio v3'],
        'Framer Motion': ['Portfolio v3'],
    };
    return skillMap[skillName] || ['Multiple Projects'];
};

interface SkillData {
    name: string;
    proficiency: number;
    orbitRadius: number;
    angle: number;
}

class Skill {
    name: string;
    proficiency: number;
    orbitRadius: number;
    angle: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    mass: number;

    constructor(data: SkillData) {
        this.name = data.name;
        this.proficiency = data.proficiency;
        this.orbitRadius = data.orbitRadius;
        this.angle = data.angle;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.mass = data.proficiency / 10;
    }

    update(centerX: number, centerY: number, allSkills: Skill[], mousePos: { x: number; y: number } | null) {
        // Orbital force
        const targetX = centerX + Math.cos(this.angle) * this.orbitRadius;
        const targetY = centerY + Math.sin(this.angle) * this.orbitRadius;
        const dx = targetX - this.x;
        const dy = targetY - this.y;

        this.vx += dx * 0.001;
        this.vy += dy * 0.001;

        // Repulsion from other skills
        allSkills.forEach(other => {
            if (other === this) return;
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100 && dist > 0) {
                const force = (100 - dist) / 100;
                this.vx += (dx / dist) * force * 0.5;
                this.vy += (dy / dist) * force * 0.5;
            }
        });

        // Mouse attraction
        if (mousePos) {
            const dx = mousePos.x - this.x;
            const dy = mousePos.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                const force = (200 - dist) / 200;
                this.vx += (dx / dist) * force * 2;
                this.vy += (dy / dist) * force * 2;
            }
        }

        // Apply velocity with damping
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Update orbit angle
        this.angle += 0.002;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const glowSize = 20 + (this.proficiency / 100) * 30;
        const alpha = 0.3 + (this.proficiency / 100) * 0.5;

        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${alpha})`);
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y + 25);

        // Proficiency bar
        const barWidth = 40;
        const barHeight = 3;
        const barX = this.x - barWidth / 2;
        const barY = this.y + 30;

        ctx.fillStyle = '#121212';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(barX, barY, barWidth * (this.proficiency / 100), barHeight);
    }
}

export default function QuantumSkills() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
    const skillsRef = useRef<Skill[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = 1000 * dpr;
        canvas.height = 700 * dpr;
        canvas.style.width = '1000px';
        canvas.style.height = '700px';
        ctx.scale(dpr, dpr);

        const centerX = 500;
        const centerY = 350;

        // Initialize skills
        const skillData: SkillData[] = [
            { name: 'React', proficiency: 95, orbitRadius: 150, angle: 0 },
            { name: 'Node.js', proficiency: 90, orbitRadius: 150, angle: Math.PI / 2 },
            { name: 'MongoDB', proficiency: 85, orbitRadius: 150, angle: Math.PI },
            { name: 'Express', proficiency: 88, orbitRadius: 150, angle: (3 * Math.PI) / 2 },
            { name: 'TypeScript', proficiency: 80, orbitRadius: 220, angle: Math.PI / 4 },
            { name: 'Tailwind', proficiency: 92, orbitRadius: 220, angle: (3 * Math.PI) / 4 },
            { name: 'Git', proficiency: 87, orbitRadius: 220, angle: (5 * Math.PI) / 4 },
            { name: 'Python', proficiency: 75, orbitRadius: 220, angle: (7 * Math.PI) / 4 },
            { name: 'Next.js', proficiency: 90, orbitRadius: 220, angle: Math.PI / 8 },
            { name: 'Framer Motion', proficiency: 85, orbitRadius: 220, angle: (9 * Math.PI) / 8 },
        ];

        skillsRef.current = skillData.map(data => new Skill(data));

        // Initialize positions
        skillsRef.current.forEach(skill => {
            skill.x = centerX + Math.cos(skill.angle) * skill.orbitRadius;
            skill.y = centerY + Math.sin(skill.angle) * skill.orbitRadius;
        });

        const drawSun = (time: number) => {
            const pulseSize = 60 + Math.sin(time * 0.002) * 10;

            // Multiple glow layers
            for (let i = 5; i > 0; i--) {
                const gradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, pulseSize * i * 0.5
                );
                gradient.addColorStop(0, `rgba(255, 215, 0, ${0.8 / i})`);
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, pulseSize * i * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Core
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fill();

            // "JS" text
            ctx.fillStyle = '#050505';
            ctx.font = 'bold 20px Space Grotesk, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('JS', centerX, centerY);

            // Rotating rays
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.25)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI / 4) + time * 0.001;
                const x1 = centerX + Math.cos(angle) * 40;
                const y1 = centerY + Math.sin(angle) * 40;
                const x2 = centerX + Math.cos(angle) * 70;
                const y2 = centerY + Math.sin(angle) * 70;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        };

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, 1000, 700);

            drawSun(time);

            skillsRef.current.forEach(skill => {
                skill.update(centerX, centerY, skillsRef.current, mousePos);
                skill.draw(ctx);
            });

            time += 16;
            requestAnimationFrame(animate);
        };

        animate();
    }, [mousePos]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 1000;
        const y = ((e.clientY - rect.top) / rect.height) * 700;

        setMousePos({ x, y });

        // Check for hover
        const hovered = skillsRef.current.find(skill => {
            const dx = skill.x - x;
            const dy = skill.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 20;
        });

        setHoveredSkill(hovered || null);
    };

    return (
        <section className="relative min-h-screen bg-void py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-black text-center mb-10 font-heading"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma to-cyan">
                        SKILLS CONSTELLATION
                    </span>
                </motion.h2>

                <p className="text-center text-carbon mb-20 max-w-2xl mx-auto">
                    Hover to interact with the quantum field. Each skill orbits with real physics—
                    they attract, repel, and respond to your presence.
                </p>

                <div className="relative max-w-5xl mx-auto">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-auto cursor-crosshair"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setMousePos(null)}
                    />

                    {/* Proficiency Legend */}
                    <div className="absolute top-4 right-4 bg-titanium/80 backdrop-blur-md border border-cyan/20 rounded-lg p-4">
                        <div className="text-xs text-carbon mb-2">PROFICIENCY</div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-1 bg-cyan"></div>
                            <span className="text-xs text-mist">90-100%</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-1 bg-cyan opacity-70"></div>
                            <span className="text-xs text-mist">80-89%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-1 bg-cyan opacity-40"></div>
                            <span className="text-xs text-mist">70-79%</span>
                        </div>
                    </div>
                </div>

                {/* Skill Tooltip */}
                <AnimatePresence>
                    {hoveredSkill && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="
                fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                bg-titanium/90 backdrop-blur-lg
                border-2 border-cyan
                rounded-2xl p-8
                shadow-[0_0_50px_rgba(0,240,255,0.5)]
                max-w-md
                pointer-events-none
                z-50
              "
                        >
                            <h3 className="text-3xl font-black text-cyan mb-2">
                                {hoveredSkill.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-1 h-2 bg-void rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan to-violet"
                                        style={{ width: `${hoveredSkill.proficiency}%` }}
                                    />
                                </div>
                                <span className="text-xl font-bold text-mist">{hoveredSkill.proficiency}%</span>
                            </div>
                            <p className="text-sm text-carbon mb-4">
                                Used in {Math.floor(hoveredSkill.proficiency / 20)}+ production projects
                            </p>

                            {/* Related Projects */}
                            <div className="mt-4 pt-4 border-t border-cyan/20">
                                <p className="text-xs text-carbon uppercase mb-2">Featured In:</p>
                                <div className="space-y-1">
                                    {getRelatedProjects(hoveredSkill.name).slice(0, 3).map((project, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-cyan rounded-full" />
                                            <span className="text-sm text-mist/70">{project}</span>
                                        </div>
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

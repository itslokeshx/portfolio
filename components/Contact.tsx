'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const socialLinks = [
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'X', icon: '𝕏', url: 'https://x.com' },
];

interface MagneticButtonProps {
    children: React.ReactNode;
    href: string;
}

function MagneticButton({ children, href }: MagneticButtonProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
                const force = (80 - distance) / 80;
                x.set(dx * force * 0.25);
                y.set(dy * force * 0.25);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: springX, y: springY }}
            className="w-28 h-28 glass rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-cyan-glow transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
        >
            {children}
        </motion.a>
    );
}

export default function Contact() {
    return (
        <div className="min-h-screen bg-void flex items-center justify-center px-6 py-20">
            <div className="max-w-2xl w-full">
                {/* Terminal Window */}
                <div className="bg-[#0a0a0a] border-2 border-cyan-400/20 rounded-2xl overflow-hidden">
                    {/* Window Chrome */}
                    <div className="bg-titanium/50 px-4 py-3 flex items-center gap-2 border-b border-cyan-400/10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="ml-4 font-mono text-sm text-cyan-400/70">
                            lokesh@terminal
                        </span>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-8 font-mono text-sm space-y-4">
                        <div className="text-cyan-400 text-2xl font-bold mb-6">
                            &gt; CONNECT_WITH_LOKESH
                        </div>

                        <div className="space-y-2 text-white/80">
                            <p>
                                <span className="text-cyan-400">&gt;</span> EMAIL: lokesh@example.com
                            </p>
                            <p>
                                <span className="text-cyan-400">&gt;</span> LOCATION: Tiruchirappalli, Tamil Nadu
                            </p>
                        </div>

                        <div className="pt-6">
                            <p className="text-cyan-400 mb-4">&gt; SOCIAL_LINKS:</p>
                            <div className="flex gap-6 justify-center py-4">
                                {socialLinks.map((link) => (
                                    <MagneticButton key={link.name} href={link.url}>
                                        <span className="text-3xl">{link.icon}</span>
                                        <span className="text-xs text-white/70">{link.name}</span>
                                    </MagneticButton>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 text-center text-white/40 text-xs">
                            <p>Designed & Built by Lokesh.</p>
                            <p>2026.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

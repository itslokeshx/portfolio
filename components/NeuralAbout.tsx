'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
}

interface Edge {
    from: string;
    to: string;
}

class Pulse {
    edge: Edge;
    progress: number;

    constructor(edge: Edge) {
        this.edge = edge;
        this.progress = 0;
    }

    update() {
        this.progress += 0.02;
        if (this.progress > 1) this.progress = 0;
    }

    draw(ctx: CanvasRenderingContext2D, nodes: Node[]) {
        const from = nodes.find(n => n.id === this.edge.from);
        const to = nodes.find(n => n.id === this.edge.to);
        if (!from || !to) return;

        const x = from.x + (to.x - from.x) * this.progress;
        const y = from.y + (to.y - from.y) * this.progress;

        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00F0FF';
        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function NeuralAbout() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = 800 * dpr;
        canvas.height = 600 * dpr;
        canvas.style.width = '800px';
        canvas.style.height = '600px';
        ctx.scale(dpr, dpr);

        const nodes: Node[] = [
            { id: 'lokesh', label: 'LOKESH', x: 400, y: 300, size: 60, color: '#00F0FF' },
            { id: 'mern', label: 'MERN Stack', x: 200, y: 200, size: 40, color: '#0077FF' },
            { id: 'react', label: 'React Expert', x: 600, y: 200, size: 40, color: '#0077FF' },
            { id: 'design', label: 'UI/UX Obsessed', x: 200, y: 400, size: 40, color: '#9D00FF' },
            { id: 'perf', label: 'Performance Nerd', x: 600, y: 400, size: 40, color: '#9D00FF' },
            { id: 'offline', label: 'Offline-First', x: 100, y: 300, size: 35, color: '#FFD700' },
            { id: 'modern', label: 'Modern Tools', x: 700, y: 300, size: 35, color: '#FFD700' },
        ];

        const edges: Edge[] = [
            { from: 'lokesh', to: 'mern' },
            { from: 'lokesh', to: 'react' },
            { from: 'lokesh', to: 'design' },
            { from: 'lokesh', to: 'perf' },
            { from: 'mern', to: 'offline' },
            { from: 'react', to: 'modern' },
        ];

        const pulses: Pulse[] = edges.map(edge => new Pulse(edge));

        const drawNetwork = () => {
            ctx.clearRect(0, 0, 800, 600);

            // Draw edges
            edges.forEach(edge => {
                const from = nodes.find(n => n.id === edge.from);
                const to = nodes.find(n => n.id === edge.to);
                if (!from || !to) return;

                ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
            });

            // Draw pulses
            pulses.forEach(pulse => {
                pulse.update();
                pulse.draw(ctx, nodes);
            });

            // Draw nodes
            nodes.forEach(node => {
                // Outer glow
                ctx.shadowBlur = 30;
                ctx.shadowColor = node.color;
                ctx.fillStyle = node.color + '40';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();

                // Inner core
                ctx.shadowBlur = 10;
                ctx.fillStyle = node.color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size * 0.6, 0, Math.PI * 2);
                ctx.fill();

                // Label
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '14px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + node.size + 20);
            });
        };

        const animate = () => {
            drawNetwork();
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    const stats = [
        { value: '5+', label: 'Production Projects', icon: '🚀' },
        { value: '100%', label: 'Offline-First', icon: '⚡' },
        { value: 'MERN', label: 'Stack Mastery', icon: '🎯' },
        { value: 'TN', label: 'Tamil Nadu', icon: '📍' },
    ];

    return (
        <section className="relative min-h-screen bg-void py-32">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-black text-center mb-20 font-heading"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                        WHO I AM
                    </span>
                </motion.h2>

                <div className="relative max-w-4xl mx-auto mb-20">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-auto mx-auto"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md text-center pointer-events-none"
                    >
                        <p className="text-lg text-mist/90 leading-relaxed">
                            I'm a <span className="text-cyan font-bold">full-stack developer</span> who
                            believes code is an art form. I build digital experiences that feel{' '}
                            <span className="text-violet font-bold">alive</span>—from offline-first
                            architectures to buttery-smooth UIs.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="
                bg-titanium/50 backdrop-blur-md
                border border-cyan/20
                rounded-xl p-6
                text-center
                group cursor-pointer
                transition-all duration-300
                hover:border-cyan/60
                hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]
              "
                        >
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-black text-cyan mb-1">{stat.value}</div>
                            <div className="text-sm text-carbon group-hover:text-mist transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

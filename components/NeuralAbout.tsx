'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
    x: number;
    y: number;
    size: number;
    label: string;
    color: string;
}

interface Edge {
    from: number;
    to: number;
}

interface Pulse {
    edgeIndex: number;
    progress: number;
}

export default function NeuralAbout() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const nodesRef = useRef<Node[]>([]);
    const edgesRef = useRef<Edge[]>([]);
    const pulsesRef = useRef<Pulse[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

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

        const centerX = 400;
        const centerY = 300;

        // Define nodes
        nodesRef.current = [
            // Center node
            { x: centerX, y: centerY, size: 60, label: 'LOKESH', color: '#00F0FF' },
            // Medium nodes
            { x: centerX - 150, y: centerY - 80, size: 40, label: 'MERN Stack', color: '#0077FF' },
            { x: centerX + 150, y: centerY - 80, size: 40, label: 'React Expert', color: '#0077FF' },
            { x: centerX - 150, y: centerY + 80, size: 40, label: 'UI/UX Obsessed', color: '#9D00FF' },
            { x: centerX + 150, y: centerY + 80, size: 40, label: 'Performance Nerd', color: '#9D00FF' },
            // Outer nodes
            { x: centerX - 250, y: centerY, size: 30, label: 'Offline-First', color: '#FFD700' },
            { x: centerX + 250, y: centerY, size: 30, label: 'Modern Tools', color: '#FFD700' },
            { x: centerX, y: centerY - 180, size: 30, label: 'Tamil Nadu', color: '#00F0FF' },
        ];

        // Define edges (all connect to center)
        edgesRef.current = [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 0, to: 3 },
            { from: 0, to: 4 },
            { from: 0, to: 5 },
            { from: 0, to: 6 },
            { from: 0, to: 7 },
            // Some outer to medium connections
            { from: 1, to: 5 },
            { from: 2, to: 6 },
        ];

        let time = 0;
        let edgesRevealed = 0;

        const drawNode = (node: Node, pulseScale: number = 1) => {
            // Outer glow
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * pulseScale);
            gradient.addColorStop(0, `${node.color}40`);
            gradient.addColorStop(1, `${node.color}00`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // Core circle
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 0.4 * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.fillStyle = '#E2E8F0';
            ctx.font = `${node.size > 50 ? 16 : 11}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, node.x, node.y);
        };

        const drawEdge = (edge: Edge, opacity: number = 1) => {
            const fromNode = nodesRef.current[edge.from];
            const toNode = nodesRef.current[edge.to];

            ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 * opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();
        };

        const drawPulse = (pulse: Pulse) => {
            const edge = edgesRef.current[pulse.edgeIndex];
            const fromNode = nodesRef.current[edge.from];
            const toNode = nodesRef.current[edge.to];

            const x = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

            // Pulse glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();

            // Pulse core
            ctx.fillStyle = '#00F0FF';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        };

        const animate = () => {
            ctx.clearRect(0, 0, 800, 600);

            // Reveal edges sequentially
            if (isVisible && edgesRevealed < edgesRef.current.length) {
                if (time % 12 === 0) { // Every 12 frames (~200ms at 60fps)
                    edgesRevealed++;
                }
            }

            // Draw edges
            edgesRef.current.forEach((edge, index) => {
                if (index < edgesRevealed) {
                    drawEdge(edge, 1);
                }
            });

            // Update and draw pulses
            if (edgesRevealed === edgesRef.current.length) {
                // Add new pulses
                if (time % 30 === 0) { // Every 30 frames (~500ms)
                    const randomEdge = Math.floor(Math.random() * edgesRef.current.length);
                    pulsesRef.current.push({ edgeIndex: randomEdge, progress: 0 });
                }

                // Update pulses
                pulsesRef.current = pulsesRef.current.filter(pulse => {
                    pulse.progress += 0.01;
                    if (pulse.progress < 1) {
                        drawPulse(pulse);
                        return true;
                    }
                    return false;
                });
            }

            // Draw nodes with pulse animation
            nodesRef.current.forEach((node, index) => {
                const pulseScale = index === 0 ? 1 + Math.sin(time * 0.05) * 0.05 : 1;
                // Add subtle float
                const floatX = node.x + Math.sin(time * 0.02 + index) * 2;
                const floatY = node.y + Math.cos(time * 0.03 + index) * 2;
                drawNode({ ...node, x: floatX, y: floatY }, pulseScale);
            });

            time++;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isVisible]);

    return (
        <section className="relative min-h-screen bg-void py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
                    viewport={{ once: true, amount: 0.3 }}
                    onViewportEnter={() => setIsVisible(true)}
                    className="text-5xl md:text-6xl font-black text-center mb-10 font-heading"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-violet to-plasma">
                        WHO I AM
                    </span>
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Neural Network Canvas */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full h-auto max-w-[800px]"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-lg text-mist/80 leading-relaxed mb-8">
                            I'm a full-stack developer who believes code is an art form.
                            I build digital experiences that feel alive—from offline-first
                            architectures to buttery-smooth UIs.
                        </p>
                        <p className="text-lg text-mist/80 leading-relaxed mb-8">
                            Every project is an obsession. Every detail matters.
                        </p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: '🚀', value: '5+', label: 'Production Projects' },
                                { icon: '⚡', value: '100%', label: 'Offline-First' },
                                { icon: '🎯', value: 'MERN', label: 'Stack Mastery' },
                                { icon: '📍', value: 'TN', label: 'Tamil Nadu Based' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-titanium/50 backdrop-blur-md border border-cyan/20 rounded-xl p-6 text-center hover:border-cyan/60 transition-all duration-300"
                                >
                                    <div className="text-4xl mb-2">{stat.icon}</div>
                                    <div className="text-3xl font-black text-cyan mb-1">{stat.value}</div>
                                    <div className="text-sm text-carbon uppercase">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

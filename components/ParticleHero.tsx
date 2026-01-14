'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function ParticleHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isFormed, setIsFormed] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 50;

        // Particle count based on device
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 5000 : 20000;

        // Geometry and buffers
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const targetPositions = new Float32Array(particleCount * 3);

        // Initialize particles in random chaos
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;

            // Gradient from cyan to violet
            const t = Math.random();
            colors[i3] = 0.0 + t * 0.6; // R
            colors[i3 + 1] = 0.94 - t * 0.94; // G
            colors[i3 + 2] = 1.0; // B

            sizes[i] = Math.random() * 2 + 1;
        }

        // Generate "LOKESH" text particles
        const generateTextParticles = () => {
            const canvas2d = document.createElement('canvas');
            const ctx = canvas2d.getContext('2d');
            if (!ctx) return;

            canvas2d.width = 800;
            canvas2d.height = 200;

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 120px Space Grotesk, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('LOKESH', 400, 100);

            const imageData = ctx.getImageData(0, 0, 800, 200);
            const pixels = imageData.data;
            const textParticles: number[] = [];

            for (let y = 0; y < 200; y += 2) {
                for (let x = 0; x < 800; x += 2) {
                    const index = (y * 800 + x) * 4;
                    const alpha = pixels[index + 3];

                    if (alpha > 128) {
                        textParticles.push(
                            (x - 400) * 0.1,
                            (100 - y) * 0.1,
                            (Math.random() - 0.5) * 10
                        );
                    }
                }
            }

            // Distribute particles to form text
            const step = Math.floor(textParticles.length / (particleCount * 3));
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const sourceIndex = (i * step) % textParticles.length;
                targetPositions[i3] = textParticles[sourceIndex] || 0;
                targetPositions[i3 + 1] = textParticles[sourceIndex + 1] || 0;
                targetPositions[i3 + 2] = textParticles[sourceIndex + 2] || 0;
            }
        };

        generateTextParticles();

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Custom shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
            },
            vertexShader: `
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = smoothstep(0.5, 0.0, dist);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Animate to formation
        setTimeout(() => {
            gsap.to(positions, {
                duration: 2,
                ease: 'elastic.out(1, 0.5)',
                onUpdate: () => {
                    for (let i = 0; i < particleCount * 3; i++) {
                        positions[i] += (targetPositions[i] - positions[i]) * 0.05;
                    }
                    geometry.attributes.position.needsUpdate = true;
                },
                onComplete: () => setIsFormed(true),
            });
        }, 500);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const planeIntersect = new THREE.Vector3();

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(plane, planeIntersect);

            if (isFormed) {
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    const dx = planeIntersect.x - positions[i3];
                    const dy = planeIntersect.y - positions[i3 + 1];
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 20) {
                        const force = (20 - distance) / 20;
                        positions[i3] += dx * force * 0.01;
                        positions[i3 + 1] += dy * force * 0.01;
                    }
                }
                geometry.attributes.position.needsUpdate = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.001;

            // Gentle rotation
            particles.rotation.y += 0.0005;

            // Return particles to target positions
            if (isFormed) {
                for (let i = 0; i < particleCount * 3; i++) {
                    positions[i] += (targetPositions[i] - positions[i]) * 0.02;
                }
                geometry.attributes.position.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [isFormed]);

    return (
        <section className="relative h-screen w-full bg-void overflow-hidden">
            {/* Three.js Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Text Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
                <h1 className="text-[15vw] md:text-[12vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan via-violet to-cyan bg-[length:200%] animate-gradient font-heading">
                    LOKESH
                </h1>
                <p className="text-xl md:text-2xl text-mist/80 tracking-widest mt-4">
                    FULL STACK DEVELOPER
                </p>
                <div className="flex gap-3 mt-6">
                    <span className="px-4 py-1 border border-cyan/30 rounded-full text-cyan text-sm backdrop-blur-sm bg-cyan/5">
                        MERN STACK
                    </span>
                    <span className="px-4 py-1 border border-violet/30 rounded-full text-violet text-sm backdrop-blur-sm bg-violet/5">
                        REACT SPECIALIST
                    </span>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-6 h-10 border-2 border-cyan/40 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-2 bg-cyan rounded-full"
                    />
                </div>
                <p className="text-xs text-carbon uppercase tracking-wider">Scroll to Explore</p>
            </motion.div>
        </section>
    );
}

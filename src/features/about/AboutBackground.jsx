"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshDistortMaterial, Float } from "@react-three/drei";

function MorphShape({ position, color, speed, index }) {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (mesh.current) {
            // Subtle rotation
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + index);
            mesh.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3 + index);
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={mesh}
                position={position}
                scale={hovered ? 1.2 : 1}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <dodecahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial
                    color={color}
                    envMapIntensity={0.4}
                    clearcoat={0.8}
                    clearcoatRoughness={0}
                    metalness={0.1}
                    distort={0.4}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

export default function AboutBackground() {
    return (
        <group>
            {/* Chapter 1 Shape */}
            <MorphShape position={[0, -1, -5]} color="#111111" speed={2} index={0} />
            {/* Chapter 2 Shape */}
            <MorphShape position={[10, 2, -5]} color="#222222" speed={3} index={1} />
            {/* Chapter 3 Shape */}
            <MorphShape position={[20, -2, -5]} color="#1a1a1a" speed={1.5} index={2} />
            {/* Chapter 4 Shape */}
            <MorphShape position={[30, 0, -5]} color="#0a0a0a" speed={2.5} index={3} />
            {/* Chapter 5 Shape */}
            <MorphShape position={[40, 1, -5]} color="#151515" speed={2} index={4} />

            {/* Ambient particles or lines could be added here */}
        </group>
    );
}

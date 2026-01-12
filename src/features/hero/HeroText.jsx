"use client";
import { useRef } from "react";
import { Text3D, Text } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

export default function HeroText() {
    const titleRef = useRef();

    return (
        <Physics gravity={[0, -0.5, 0]} timeStep={1 / 60}>
            <group position={[0, 0, 0]}>
                {/* Main Title - LOKESH */}
                <Text3D
                    ref={titleRef}
                    font="/fonts/Inter_Bold.json"
                    size={1.2}
                    height={0.3}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-2.5, 0, 0]}
                >
                    LOKESH
                    <meshStandardMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.5}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Text3D>

                {/* Subtitle - Full Stack Developer */}
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.25}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.1}
                >
                    Full Stack Developer · MERN Stack
                </Text>

                {/* GitHub Stats */}
                <Text
                    position={[0, -2.2, 0]}
                    fontSize={0.15}
                    color="#888888"
                    anchorX="center"
                    anchorY="middle"
                >
                    125+ Contributions · 43 Repositories
                </Text>
            </group>
        </Physics>
    );
}

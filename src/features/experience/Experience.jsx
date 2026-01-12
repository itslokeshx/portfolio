"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { experiences } from "./data";

function ExperienceCard({ data, position, index }) {
    const mesh = useRef();

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Glass Platform */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[4, 32]} />
                    <meshPhysicalMaterial
                        color="black"
                        transparent
                        opacity={0.8}
                        roughness={0}
                        metalness={0.8}
                        clearcoat={1}
                        side={2} // Double side
                    />
                </mesh>

                {/* Glowing Ring */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[3.8, 4, 32]} />
                    <meshBasicMaterial color={data.color} toneMapped={false} />
                </mesh>

                {/* Text Content */}
                <group position={[0, 1.5, 0]}>
                    <Text
                        fontSize={0.4}
                        color={data.color}
                        anchorX="center"
                        anchorY="bottom"
                        position={[0, 0.4, 0]}
                    >
                        {data.period}
                    </Text>
                    <Text
                        fontSize={0.6}
                        color="white"
                        anchorX="center"
                        anchorY="bottom"
                        fontWeight="bold"
                    >
                        {data.company}
                    </Text>
                    <Text
                        fontSize={0.3}
                        color="#ccc"
                        anchorX="center"
                        anchorY="top"
                        position={[0, -0.2, 0]}
                        maxWidth={3}
                        textAlign="center"
                    >
                        {data.role}
                    </Text>
                </group>

                {/* Connecting Line (Beam) */}
                <mesh position={[0, 10, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 20]} />
                    <meshBasicMaterial color="gray" opacity={0.2} transparent />
                </mesh>
            </Float>
        </group>
    );
}

export default function Experience() {
    return (
        <group>
            {/* Central vertical axis beam */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 100]} />
                <meshBasicMaterial color="#333" />
            </mesh>

            {experiences.map((exp, i) => (
                <ExperienceCard
                    key={exp.id}
                    data={exp}
                    index={i}
                    position={[
                        (i % 2 === 0 ? 3 : -3), // Alternate left/right
                        -i * 15,  // Vertical spacing
                        0
                    ]}
                />
            ))}
        </group>
    );
}

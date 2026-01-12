"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function ContactAvatar() {
    const headRef = useRef();
    const eyesRef = useRef();

    useFrame((state) => {
        if (headRef.current) {
            // Head tracking mouse
            const x = (state.mouse.x * 0.5); // dampened
            const y = (state.mouse.y * 0.5);

            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, x, 0.1);
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -y, 0.1);
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <group ref={headRef}>
                    {/* Head */}
                    <mesh>
                        <boxGeometry args={[1.5, 2, 1.2]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
                    </mesh>

                    {/* Face Screen */}
                    <mesh position={[0, 0, 0.61]}>
                        <planeGeometry args={[1.2, 1.5]} />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Glowing Eyes */}
                    <group ref={eyesRef} position={[0, 0.2, 0.62]}>
                        <mesh position={[-0.3, 0, 0]}>
                            <circleGeometry args={[0.15, 32]} />
                            <meshBasicMaterial color="#00f0ff" toneMapped={false} />
                        </mesh>
                        <mesh position={[0.3, 0, 0]}>
                            <circleGeometry args={[0.15, 32]} />
                            <meshBasicMaterial color="#00f0ff" toneMapped={false} />
                        </mesh>
                    </group>

                    {/* Cyberpunk details */}
                    <mesh position={[0.8, 0, 0]}>
                        <boxGeometry args={[0.2, 1, 0.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    <mesh position={[-0.8, 0, 0]}>
                        <boxGeometry args={[0.2, 1, 0.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </group>
            </Float>

            {/* Holographic Base */}
            <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1, 2, 32]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.5, 2.6, 64]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

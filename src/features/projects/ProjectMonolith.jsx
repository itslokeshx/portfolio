"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Html } from "@react-three/drei";
import * as THREE from "three";

export default function ProjectMonolith({ project, position, rotation, onClick }) {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);

    // Gentle float animation
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={onClick}
            >
                <boxGeometry args={[3, 4, 0.2]} />
                <meshStandardMaterial
                    color={hovered ? "#333" : "#111"}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={hovered ? "#00f0ff" : "#000000"}
                    emissiveIntensity={hovered ? 0.2 : 0}
                />
            </mesh>

            {/* Title Text Floating Above */}
            <Text
                position={[0, 2.5, 0.2]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, 0]}
            >
                {project.title}
            </Text>

            {/* Placeholder Image/Video Surface */}
            {/* For V1 using a simple colored plane or grid if image missing */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[2.8, 3.8]} />
                <meshBasicMaterial color="#0a0a0a" />
            </mesh>

            {/* We can use <Image> from drei if we had assets, or VideoTexture logic */}

            {hovered && (
                <Html position={[0, -2.5, 0]} center transform>
                    <div style={{
                        color: '#00f0ff',
                        fontFamily: 'monospace',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '5px 10px',
                        border: '1px solid #00f0ff'
                    }}>
                        CLICK TO VIEW
                    </div>
                </Html>
            )}
        </group>
    );
}

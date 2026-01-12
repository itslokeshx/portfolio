"use client";
import { useState, useRef, useEffect } from "react";
import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

function Letter({ char, position, font, onExplode, exploded, index }) {
    const rigidBody = useRef();
    const [hovered, setHovered] = useState(false);

    // Return to original position if not exploded
    useFrame(() => {
        if (!exploded && rigidBody.current) {
            // Lerp back to start position logic would go here if we were using kinematic
            // But for dynamic bodies, we might need to sleep them or use forces.
            // Simpler approach: If exploded is false, we make it KinematicPosition and set position manually
            // If exploded is true, we make it Dynamic.
            // However, changing body type at runtime in Rapier can be tricky in R3F depending on version.
            // Let's try: Dynamic always, but we apply strong spring force to "home" when not exploded.

            if (!exploded) {
                const currentPos = rigidBody.current.translation();
                const targetPos = new THREE.Vector3(...position);

                // Simple Spring force
                const k = 10;
                const damping = 2;

                // We might just wake it up and move it?
                // Actually, simpler: Key reset. We remount the component or reset the rigid body state.
                // Let's stick to the "Explosion" logic: Dynamic body. 
                // When reset, we teleport it back.
            }
        }
    });

    // Since complex physics reset is tricky effectively without specialized hooks, 
    // we will use the `key` prop on the parent to re-mount the letters when they need to reset.
    // The interactive "Explosion" is the event.

    return (
        <RigidBody
            ref={rigidBody}
            position={position}
            colliders="cuboid"
            enabled={exploded} // Only enable physics simulation when exploded
            type={exploded ? "dynamic" : "fixed"} // Fixed until exploded
            restitution={0.6}
        >
            <Text3D
                font={font}
                size={0.8}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    onExplode(index);
                }}
            >
                {char}
                <meshStandardMaterial
                    color={hovered ? "#00f0ff" : "#ffffff"}
                    emissive={hovered ? "#00f0ff" : "#000000"}
                    emissiveIntensity={hovered ? 0.8 : 0}
                    roughness={0.1}
                    metalness={0.1}
                />
            </Text3D>
        </RigidBody>
    );
}

export default function HeroText({ text = "CREATIVE" }) {
    const [exploded, setExploded] = useState(false);
    const group = useRef();
    const fontUrl = "/fonts/Inter_Bold.json";

    const letters = text.split("");

    const handleExplode = () => {
        if (exploded) return;
        setExploded(true);

        // Trigger reset after 3 seconds
        setTimeout(() => {
            setExploded(false);
        }, 3000);
    };

    // Calculate approximate spacing
    // Since we don't know width until render, we accept fixed spacing for simplicity in this V1
    const spacing = 0.6;
    const totalWidth = letters.length * spacing;
    const startX = -totalWidth / 2;

    return (
        <Physics gravity={[0, 0, 0]}> {/* Zero gravity so they float away or use impulses */}
            <group ref={group}>
                {letters.map((char, i) => (
                    <Letter
                        key={`${i}-${exploded}`} // Remount on reset to restore position
                        index={i}
                        char={char}
                        font={fontUrl}
                        position={[startX + i * spacing, 0, 0]}
                        exploded={exploded}
                        onExplode={() => {
                            // Apply impulse to all
                            setExploded(true);
                            setTimeout(() => setExploded(false), 3000);
                        }}
                    />
                ))}
            </group>
            {/* Invisible floor or walls if we want them to bounce, but brief says "tumble through space" */}
        </Physics>
    );
}

"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Starfield({ count = 3000 }) {
    const points = useRef();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const d = 20; // Spread distance
            const x = (Math.random() - 0.5) * d;
            const y = (Math.random() - 0.5) * d;
            const z = (Math.random() - 0.5) * d;
            positions.set([x, y, z], i * 3);
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (points.current) {
            // Slow rotation drift
            points.current.rotation.x -= delta * 0.01;
            points.current.rotation.y -= delta * 0.015;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#ffffff"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.3}
                depthWrite={false}
            />
        </points>
    );
}

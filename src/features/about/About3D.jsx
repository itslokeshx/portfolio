"use client";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AboutBackground from "./AboutBackground";

export default function About3D() {
    const groupRef = useRef();
    const scrollProgress = useRef(0);

    useEffect(() => {
        // Listen to custom event from HTML world
        const handleScroll = (e) => {
            scrollProgress.current = e.detail; // 0 to 1
        };
        window.addEventListener('about-scroll', handleScroll);
        return () => window.removeEventListener('about-scroll', handleScroll);
    }, []);

    useFrame((state) => {
        // Smooth camera movement based on progress
        // We want to move from X=0 to X=40 (since we have 5 items spaced by 10)
        const targetX = scrollProgress.current * 40;

        // We can move the camera, OR move the group in reverse.
        // Moving the camera is riskier if we have other fixed elements (like Hero).
        // But since Hero is scrolled past, we can move the camera.
        // However, if we move the camera globally, we need to ensure it returns or resets for other sections.
        // Easier approach: Move the `group` container in reverse X to simulate camera passing by.

        // Wait, Hero section is at Y=0? 
        // Usually "Scroll" implies moving down in Y. Hero is at top. About is below.
        // But we are pinning "About" section in HTML. 
        // So the visual effect is horizontal.
        // Let's assume the camera stays at [0,0,5] relative to the viewport, 
        // but the content slides by.

        if (groupRef.current) {
            // Lerp for smoothness
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -targetX, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            <AboutBackground />
        </group>
    );
}

"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraManager() {
    const { camera } = useThree();
    const tl = useRef();

    useEffect(() => {
        // We can use ScrollTrigger to create a timeline that moves the camera
        // as we scroll through the entire page.
        // However, since we have pinning sections (About), the scroll distance 
        // doesn't Map 1:1 to Y position linearly if we just use scrollY.
        // Better to have specific triggers for specific sections.

        // Trigger 1: Hero to About
        // Hero is 100vh.
        // When we scroll past Hero, camera moves down.

        // BUT, the About section PINS itself. So while it is pinned, the window.scrollY increases, 
        // but we might NOT want the camera to move DOWN further, but rather stay fixed 
        // while the "Horizontal" 3D movement happens (handled by About3D).

        // So: 
        // 0 -> 100vh: Camera moves 0 -> -10 (Transition to About)
        // 100vh -> 500vh (Pinned): Camera Y stays at -10. 
        // This allows About3D to do its horizontal logic at Y=-10.

        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrubbing
            }
        });

        // Instead of one big timeline, let's use isolated triggers or a managed approach.
        // Let's try a simple approach first:
        // We assume explicit knowlege of the layout:
        // Hero: 100vh
        // About: 500vh (pinned)

        // 1. Move Camera from Hero to About position
        gsap.to(camera.position, {
            y: -15, // Move down to match About section position
            scrollTrigger: {
                trigger: "#about-trigger", // The section element
                start: "top bottom", // When top of about hits bottom of viewport
                end: "top top",      // When top of about hits top of viewport
                scrub: true
            }
        });

        // 2. While pinned in About, typically camera Y stays constant (handled by lack of trigger).
        // The "Horizontal" move is handled inside About3D listening to the same trigger progress.

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [camera]);

    return null;
}

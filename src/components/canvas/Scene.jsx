"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import useStore from "@/store/useStore";
import Hero from "@/features/hero/Hero";
import CameraManager from "./CameraManager";
import About3D from "@/features/about/About3D";
import SkillsPhysics from "@/features/skills/SkillsPhysics";
import Gallery from "@/features/projects/Gallery";
import Experience from "@/features/experience/Experience";
import ContactAvatar from "@/features/contact/ContactAvatar";

export default function Scene() {
    const loaded = useStore((state) => state.loaded);

    return (
        <div className="scene-container">
            <Canvas
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 1.5]} // Optimization for varying screens
                camera={{ position: [0, 0, 5], fov: 75 }}
            >
                <color attach="background" args={['#0a0a0a']} />

                {/* Enhanced Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00f0ff" />
                <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.3} penumbra={1} />
                <fog attach="fog" args={['#0a0a0a', 10, 50]} />

                <Suspense fallback={null}>
                    <CameraManager />
                    <Hero />
                    <group position={[0, -15, 0]}>
                        <About3D />
                    </group>
                    <group position={[0, -35, 0]}>
                        <SkillsPhysics />
                    </group>
                    <group position={[0, -60, 0]}>
                        <Gallery />
                    </group>
                    <group position={[0, -100, 0]}>
                        <Experience />
                    </group>
                    <group position={[0, -200, 0]}>
                        <ContactAvatar />
                    </group>
                    <Preload all />
                </Suspense>
            </Canvas>

            <style jsx>{`
        .scene-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1; /* Behind UI */
        }
      `}</style>
        </div>
    );
}

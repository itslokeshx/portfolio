"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import useStore from "@/store/useStore";

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

                {/* Ambient setup */}
                <ambientLight intensity={0.2} />
                <fog attach="fog" args={['#0a0a0a', 5, 15]} />

                <Suspense fallback={null}>
                    {/* Content will go here */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>
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

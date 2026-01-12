"use client";
import { Suspense } from "react";
import Portal from "./Portal";
import Starfield from "./Starfield";
import { Float, Text3D, Center } from "@react-three/drei";

export default function Hero() {
    return (
        <group>
            <Starfield />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Portal />
            </Float>

            {/* 3D Text Placeholder - Will refine in next step */}
            <Suspense fallback={null}>
                <Center position={[0, 0, 1.5]}>
                    <HeroText text="LOKI" />
                </Center>
            </Suspense>
        </group>
    );
}

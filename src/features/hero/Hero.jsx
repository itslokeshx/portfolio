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
                    {/* Using a standard font for now. Warning: Text3D needs a json font file. 
                I'll use a helvetiker blob or standard drei fallback if available, 
                but usually you must provide a path. 
                For now I'll comment it out to prevent crash until I add the font file. 
            */}
                    {/* <Text3D font="/fonts/Inter_Bold.json">
              HELLO WORLD
            </Text3D> */}
                </Center>
            </Suspense>
        </group>
    );
}

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

export default function Portal() {
    const mesh = useRef();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color("#006680") },
            uColorEnd: { value: new THREE.Color("#660044") },
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();

            // Idle rotation
            mesh.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]} scale={[2, 2, 2]}>
            <torusGeometry args={[1, 0.4, 64, 128]} />
            <shaderMaterial
                vertexShader={typeof vertexShader === 'string' ? vertexShader : vertexShader.default}
                fragmentShader={typeof fragmentShader === 'string' ? fragmentShader : fragmentShader.default}
                uniforms={uniforms}
                side={THREE.DoubleSide}
                // transparent={true}
                toneMapped={false} // Allow bloom
            />
        </mesh>
    );
}

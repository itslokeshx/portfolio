"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies } from "@react-three/rapier";
import { MeshTransmissionMaterial, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "./data";

function GlassCube() {
    return (
        <group>
            {/* Physical Walls (Invisible Colliders) */}
            <RigidBody type="fixed" restitution={0.2} friction={0}>
                <CuboidCollider args={[3.2, 0.1, 3.2]} position={[0, -3.1, 0]} /> {/* Floor */}
                <CuboidCollider args={[3.2, 0.1, 3.2]} position={[0, 3.1, 0]} />  {/* Ceiling */}
                <CuboidCollider args={[0.1, 3, 3]} position={[-3.1, 0, 0]} />     {/* Left */}
                <CuboidCollider args={[0.1, 3, 3]} position={[3.1, 0, 0]} />      {/* Right */}
                <CuboidCollider args={[3, 3, 0.1]} position={[0, 0, -3.1]} />     {/* Back */}
                <CuboidCollider args={[3, 3, 0.1]} position={[0, 0, 3.1]} />      {/* Front */}
            </RigidBody>

            {/* Visual Glass Box */}
            <mesh>
                <boxGeometry args={[6, 6, 6]} />
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={0.1}
                    thickness={0.1}
                    chromaticAberration={0.05}
                    anisotropicBlur={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    transmission={0.95}
                    ior={1.5}
                    color="#ffffff"
                    roughness={0}
                />
            </mesh>

            {/* Glowing Edges */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(6, 6, 6)]} />
                <lineBasicMaterial color="#00f0ff" transparent opacity={0.3} />
            </lineSegments>
        </group>
    );
}

function SkillSpheres() {
    const [hovered, setHovered] = useState(null);
    const instances = useMemo(() => {
        return skills.map((skill, i) => ({
            key: i,
            position: [
                (Math.random() - 0.5) * 4,
                Math.random() * 5,
                (Math.random() - 0.5) * 4
            ],
            rotation: [Math.random() * Math.PI, 0, 0],
            scale: skill.level === "Expert" ? 0.6 : 0.4,
        }));
    }, []);

    const bodies = useRef();

    return (
        <InstancedRigidBodies
            ref={bodies}
            instances={instances}
            colliders="ball"
            restitution={0.6}
            friction={0.1}
        >
            <instancedMesh args={[undefined, undefined, skills.length]} count={skills.length}
                onPointerMove={(e) => {
                    // Instance ID is e.instanceId
                    if (e.instanceId !== undefined) setHovered(e.instanceId);
                }}
                onPointerOut={() => setHovered(null)}
                onClick={(e) => {
                    if (e.instanceId !== undefined && bodies.current) {
                        // Pop effect: Apply impulse
                        // Access the specific body logic if available, or just log
                        // InstancedRigidBodies api is slightly different.
                        // We usually need the API of the instance.
                        // bodies.current.at(e.instanceId).applyImpulse({ x: 0, y: 5, z: 0 }, true);
                        try {
                            bodies.current[e.instanceId].applyImpulse({ x: 0, y: 10, z: 0 }, true);
                        } catch (err) { console.log(err) }
                    }
                }}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhysicalMaterial
                    metalness={0.2}
                    roughness={0.1}
                    clearcoat={1}
                >
                    {/* We can't easily map individual textures to instanced mesh without custom shader or texture atlas.
                 For V1, we will color them differently or use simple text overlay above.
                 Actually, brief says "Each sphere has the skill's logo".
                 With InstancedMesh, we get ONE material.
                 We can use `useInstancedMeshColors` or attribute injection, but textures are hard.
                 Alternative: Don't use InstancedMesh. Navigation says "20-30 skill spheres". 
                 Regular Mesh is fine for 30 items.
             */}
                </meshPhysicalMaterial>
            </instancedMesh>

            {/* 
         Since we want individual textures/colors, let's switch to Map of components.
         30 RigidBodies is cheap.
      */}
        </InstancedRigidBodies>
    );
}

function IndividualSkills() {
    // Replacement for Instanced wrapper to allow individual materials/text
    return skills.map((skill, i) => (
        <RigidBody
            key={i}
            position={[(Math.random() - 0.5) * 2, 2 + i * 0.5, (Math.random() - 0.5) * 2]}
            colliders="ball"
            restitution={0.7}
        >
            <mesh
                onClick={(e) => {
                    e.stopPropagation();
                    // "Pop" logic
                }}
            >
                <sphereGeometry args={[skill.level === "Expert" ? 0.4 : 0.3, 32, 32]} />
                <meshStandardMaterial
                    color={skill.color}
                    metalness={0.4}
                    roughness={0.2}
                    emissive={skill.color}
                    emissiveIntensity={0.2}
                />
                <Html distanceFactor={10} position={[0, 0, 0]} transform pointerEvents="none">
                    <div style={{
                        color: 'white',
                        fontSize: '8px',
                        fontWeight: 'bold',
                        textShadow: '0 0 2px black',
                        pointerEvents: 'none',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap'
                    }}>
                        {skill.name}
                    </div>
                </Html>
            </mesh>
        </RigidBody>
    ));
}

function MouseRepulsor() {
    const { mouse, viewport } = useThree();
    const api = useRef();

    useFrame((state) => {
        if (api.current) {
            // Convert screen mouse to 3D world pos at depth 0
            const x = (state.mouse.x * viewport.width) / 2;
            const y = (state.mouse.y * viewport.height) / 2;
            api.current.setNextKinematicTranslation({ x, y, z: 0 });
        }
    });

    return (
        <RigidBody ref={api} type="kinematicPosition" colliders={false}>
            <ballCollider args={[1.5]} /> {/* Large repulsor radius */}
        </RigidBody>
    );
}

export default function SkillsPhysics() {
    return (
        <group position={[0, 0, 0]}>
            <Physics gravity={[0, -5, 0]}> {/* Lower gravity for floaty feel */}
                <GlassCube />
                <IndividualSkills />
                <MouseRepulsor />
            </Physics>
        </group>
    );
}

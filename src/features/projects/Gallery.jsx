"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CatmullRomCurve3 } from "three";
import { projects } from "./data";
import ProjectMonolith from "./ProjectMonolith";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function Gallery() {
    const { camera } = useThree();

    // Create a curved path
    const curve = useMemo(() => {
        return new CatmullRomCurve3([
            new THREE.Vector3(-10, 0, 0),
            new THREE.Vector3(-5, 0, -5),
            new THREE.Vector3(0, 0, -10),
            new THREE.Vector3(5, 0, -15),
            new THREE.Vector3(10, 0, -20),
        ]);
    }, []);

    const linePoints = useMemo(() => curve.getPoints(50), [curve]);

    useEffect(() => {
        // Gallery Scroll Trigger
        // This controls the Camera movement ALONG the curve when inside the Gallery section

        // We assume camera arrives at the start of the gallery via CameraManager (at Y=-60 approx?)
        // Actually, let's keep gallery isolated in coordinates.
        // Position this Group at Y = -60.
        // When scroll trigger hits "projects", we move camera Z ???
        // The path moves in Z and X.

        // Let's rely on CameraManager to define the "Global" position (Y=-60).
        // AND we add a listener here to move the camera relative to that?
        // Or simply: CameraManager moves camera Y to -60.
        // AND CameraManager ALSO can contain logic to move X/Z based on timeline?

        // Better: Keep logic local here to avoid monolithic manager.
        // But Camera is shared.
        // We can use a `ref` for the camera animation timeline.

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#projects-trigger",
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Animate a dummy object or value from 0 to 1
        const progress = { value: 0 };

        tl.to(progress, {
            value: 1,
            onUpdate: () => {
                const point = curve.getPoint(progress.value);
                const lookAtPoint = curve.getPoint(Math.min(progress.value + 0.1, 1));

                // We need to ADD the group position offset if we want local coordinates,
                // BUT changing camera.position is global.
                // So we should define the curve in Global World Space matching where we put the group.
                // Group is at Y=-60.

                camera.position.x = point.x;
                camera.position.y = -60; // Keep Y fixed or slight variation
                camera.position.z = point.z;

                camera.lookAt(lookAtPoint.x, -60, lookAtPoint.z);
            }
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };

    }, [camera, curve]);

    return (
        <group>
            {/* Visual Guide Line for Path */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePoints.length}
                        array={new Float32Array(linePoints.flatMap(p => [p.x, 0, p.z]))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#333" />
            </line>

            {projects.map((proj, i) => {
                // Place projects along the curve
                const t = (i + 1) / (projects.length + 1);
                const point = curve.getPoint(t);
                const tangent = curve.getTangent(t);
                const rotationY = Math.atan2(tangent.x, tangent.z);

                // Offset slightly from path
                const offset = i % 2 === 0 ? 2 : -2;
                const pos = new THREE.Vector3(point.x + offset, 0, point.z);

                return (
                    <ProjectMonolith
                        key={proj.id}
                        project={proj}
                        position={[pos.x, 0, pos.z]}
                        rotation={[0, 0, 0]} // Face forward - no rotation to prevent mirrored text
                    />
                );
            })}
        </group>
    );
}

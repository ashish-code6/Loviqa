"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Html } from "@react-three/drei";
import FloatingCard from "./three/FloatingCard";
import {
    Float,
    Environment,
    Points,
    PointMaterial,
    OrbitControls,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import NetworkLines from "./three/NetworkLines";
import GlowSphere from "./three/GlowSphere";
import Lights from "./three/Lights";
import AIOrb from "./three/AIOrb";
import Ring from "./three/Ring";
import EnergyField from "./three/EnergyField";


function Stars() {
    const ref = useRef();

    const positions = useMemo(() => {
        const p = [];

        for (let i = 0; i < 3000; i++) {
            p.push(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
            );
        }

        return new Float32Array(p);
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y =
                state.clock.elapsedTime * 0.015;
        }
    });

    return (
        <Points ref={ref} positions={positions}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.03}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
}


function SmallOrb() {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;

        const t = state.clock.elapsedTime;

        ref.current.position.x =
            Math.cos(t) * 2.6;

        ref.current.position.z =
            Math.sin(t) * 2.6;
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.08, 32, 32]} />

            <meshBasicMaterial color="#ffffff" />
        </mesh>
    );
}

export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
        >
            <color attach="background" args={["#070B14"]} />



            <ambientLight intensity={2} />

            <Lights/>

            <Stars />
            <GlowSphere />

            <Ring />

            <EnergyField />

            <SmallOrb />

            <FloatingCard
                position={[-2.7, 1.2, 0]}
                title="Music Club"
                subtitle="4 members online"
                color="#8B5CF6"
            />

            <FloatingCard
                position={[2.8, -1.3, 0]}
                title="Gaming Club"
                subtitle="2 members joined"
                color="#EC4899"
            />

            <FloatingCard
                position={[0, 2.5, 0]}
                title="AI Match"
                subtitle="98% Compatibility"
                color="#06B6D4"
            />
            <NetworkLines/>

            <AIOrb />

            <Environment preset="city" />
            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.8}
            />

        </Canvas>

    );
}
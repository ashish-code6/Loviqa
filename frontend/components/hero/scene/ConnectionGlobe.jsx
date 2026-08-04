"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seededRandom } from "./seededRandom";

const GLOBE_RADIUS = 1.34;

export default function ConnectionGlobe() {
  const globe = useRef();
  const points = useMemo(() => {
    const values = [];
    for (let i = 0; i < 2200; i += 1) {
      const phi = Math.acos(2 * seededRandom(i, 4) - 1);
      const theta = seededRandom(i, 9) * Math.PI * 2;
      values.push(
        GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
        GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
        GLOBE_RADIUS * Math.cos(phi)
      );
    }
    return new Float32Array(values);
  }, []);

  useFrame((state) => {
    if (!globe.current) return;
    globe.current.rotation.y = state.clock.elapsedTime * 0.12;
    globe.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
  });

  return (
    <group ref={globe}>
      <mesh scale={[1.03, 1.03, 1.03]}>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshBasicMaterial color="#f0abfc" transparent opacity={0.035} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshBasicMaterial color="#7c2dff" transparent opacity={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.006, 64, 64]} />
        <meshBasicMaterial color="#f9a8d4" wireframe transparent opacity={0.08} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#e9d5ff" size={0.016} transparent opacity={0.95} depthWrite={false} />
      </points>
      {Array.from({ length: 34 }).map((_, index) => {
        const angle = (index / 26) * Math.PI * 2;
        const start = new THREE.Vector3(Math.cos(angle) * GLOBE_RADIUS, Math.sin(angle * 1.7) * 0.74, Math.sin(angle) * GLOBE_RADIUS);
        const end = new THREE.Vector3(Math.cos(angle + 1.2) * GLOBE_RADIUS, Math.sin(angle * 1.2) * -0.72, Math.sin(angle + 1.2) * GLOBE_RADIUS);
        const curve = new THREE.QuadraticBezierCurve3(start, new THREE.Vector3(0, 0, 0), end);
        return (
          <line key={index}>
            <bufferGeometry setFromPoints={curve.getPoints(32)} />
            <lineBasicMaterial color={index % 4 === 0 ? "#fb923c" : "#a855f7"} transparent opacity={0.34} />
          </line>
        );
      })}
    </group>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NetworkLines() {
  const group = useRef();

  const lines = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
      const a = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );

      const b = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );

      arr.push([a, b]);
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={group}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={
                new Float32Array([
                  line[0].x,
                  line[0].y,
                  line[0].z,

                  line[1].x,
                  line[1].y,
                  line[1].z,
                ])
              }
              itemSize={3}
            />
          </bufferGeometry>

          <lineBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.35}
          />
        </line>
      ))}
    </group>
  );
}
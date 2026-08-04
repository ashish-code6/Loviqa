"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={2} />

      <pointLight
        position={[5, 5, 5]}
        intensity={40}
        color="#8B5CF6"
      />

      <pointLight
        position={[-5, -5, -5]}
        intensity={20}
        color="#ffffff"
      />

      <pointLight
        position={[0, 5, -5]}
        intensity={15}
        color="#06B6D4"
      />
    </>
  );
}
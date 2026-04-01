import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';
import * as THREE from 'three';

// --- HOME SCENE: Particle Matrix ---
export const HomeScene: React.FC = () => {
  const points = useRef<THREE.Points>(null!);
  const count = 2000;
  
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sizes[i] = Math.random() * 2;
    }
    return [positions, sizes];
  }, []);

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.05;
      points.current.rotation.x = time * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00ff41" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// --- PROJECTS SCENE: Cyber Grid Floor ---
export const ProjectsScene: React.FC = () => {
  const grid = useRef<THREE.Group>(null!);

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();
    if (grid.current) {
      grid.current.position.z = (time * 0.5) % 2;
    }
  });

  return (
    <group ref={grid} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <gridHelper args={[20, 20, '#00ff41', '#004411']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// --- SKILLS SCENE: Neural Tech Web ---
export const SkillsScene: React.FC = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = time * 0.1;
      group.current.rotation.z = time * 0.05;
    }
  });

  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      position: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8] as [number, number, number],
    }));
  }, []);

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color="#00ff41" wireframe />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// --- EXPERIENCE SCENE: Longitudinal Tunnel ---
export const ExperienceScene: React.FC = () => {
  const tunnel = useRef<THREE.Mesh>(null!);

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();
    if (tunnel.current) {
      tunnel.current.rotation.z = time * 0.2;
    }
  });

  return (
    <mesh ref={tunnel} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[2, 2, 20, 16, 1, true]} />
      <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
};

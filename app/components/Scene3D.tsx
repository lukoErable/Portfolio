'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* Shared input state, updated by window listeners */
const mouse = { x: 0, y: 0 };
const scroll = { progress: 0 };

function ParticleField({ count = 2600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color('#22d3ee');
    const violet = new THREE.Color('#8b5cf6');
    const blue = new THREE.Color('#3b82f6');
    const palette = [cyan, violet, blue];

    for (let i = 0; i < count; i++) {
      // Points distributed in a large sphere shell around the camera
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      const dim = 0.35 + Math.random() * 0.65;
      colors[i * 3] = c.r * dim;
      colors[i * 3 + 1] = c.g * dim;
      colors[i * 3 + 2] = c.b * dim;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y += delta * 0.02;
    // Smooth parallax toward the mouse, plus a slow tumble driven by scroll
    p.rotation.x = THREE.MathUtils.lerp(
      p.rotation.x,
      mouse.y * 0.15 + scroll.progress * 0.5,
      0.03
    );
    p.rotation.z = THREE.MathUtils.lerp(
      p.rotation.z,
      mouse.x * 0.08 + scroll.progress * 0.25,
      0.03
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShape({
  position,
  scale,
  speed,
  color,
  type,
  travel,
  wobble = 1,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  type: 'icosahedron' | 'torus' | 'octahedron';
  /* Total displacement across the page: shape wanders from its base
     position to base + travel as the user scrolls top → bottom */
  travel: [number, number, number];
  wobble?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime * speed;
    const p = scroll.progress;

    // Spin a little faster while travelling
    m.rotation.x += delta * 0.15 * speed * (1 + p);
    m.rotation.y += delta * 0.2 * speed * (1 + p);

    // Scroll-driven journey with a sinuous detour, plus idle bobbing
    const targetX =
      basePos.x +
      travel[0] * p +
      Math.sin(p * Math.PI * 2) * wobble +
      mouse.x * 0.6;
    const targetY =
      basePos.y + travel[1] * p + Math.sin(t) * 0.4 - mouse.y * 0.3;
    const targetZ = basePos.z + travel[2] * p;

    m.position.x = THREE.MathUtils.lerp(m.position.x, targetX, 0.045);
    m.position.y = THREE.MathUtils.lerp(m.position.y, targetY, 0.045);
    m.position.z = THREE.MathUtils.lerp(m.position.z, targetZ, 0.045);
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {type === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
      {type === 'torus' && <torusGeometry args={[1, 0.35, 16, 48]} />}
      {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.14} />
    </mesh>
  );
}

function CameraDrift() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.02
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -mouse.y * 0.3,
      0.02
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          window.addEventListener('pointermove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
          });
          const onScroll = () => {
            const max =
              document.documentElement.scrollHeight - window.innerHeight;
            scroll.progress = max > 0 ? window.scrollY / max : 0;
          };
          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        }}
      >
        <CameraDrift />
        <ParticleField />
        {/* Each shape crosses the page along its own path while scrolling */}
        <FloatingShape
          position={[-4.5, 1.5, -3]}
          scale={1.4}
          speed={0.7}
          color="#22d3ee"
          type="icosahedron"
          travel={[9, -3.5, 1.5]}
          wobble={1.2}
        />
        <FloatingShape
          position={[4.8, -1.2, -4]}
          scale={1.1}
          speed={0.5}
          color="#8b5cf6"
          type="torus"
          travel={[-9.5, 3, 2]}
          wobble={1.5}
        />
        <FloatingShape
          position={[2.5, 2.4, -6]}
          scale={0.9}
          speed={0.9}
          color="#3b82f6"
          type="octahedron"
          travel={[-6, -5, 3.5]}
          wobble={0.8}
        />
      </Canvas>
    </div>
  );
}

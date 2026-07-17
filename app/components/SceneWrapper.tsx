'use client';

import dynamic from 'next/dynamic';

/* The 3D scene uses WebGL: load it client-side only, after hydration */
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function SceneWrapper() {
  return <Scene3D />;
}

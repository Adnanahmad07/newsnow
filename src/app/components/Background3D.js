'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';

function AnimatedSphere() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color="#4f46e5"
                wireframe
                transparent
                opacity={0.5}
            />
        </mesh>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
} 
"use client"

import Background3D from './components/Background3D';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <Background3D /> */}
      <HeroSection />
    </div>
  );
}
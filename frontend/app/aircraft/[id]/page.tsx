"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { AircraftModel } from "@/components/3d/AircraftModel";
import { useStore } from "@/lib/store";
import { Plane, Maximize2 } from "lucide-react";
import { Suspense } from "react";

export default function AircraftViewerPage({ params }: { params: { id: string } }) {
  const { aircraft } = useStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end pb-4 border-b border-white/10 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Plane className="w-8 h-8 text-primary-400" />
            Digital Twin: {aircraft.aircraftId}
          </h1>
          <p className="text-gray-400 mt-1">Interactive 3D health visualization</p>
        </div>
      </header>

      <div className="flex-1 glass-panel relative overflow-hidden flex flex-col">
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Subsystem Status</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Nominal
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" /> Warning (Degradation)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" /> Critical (AOG Risk)
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10 pointer-events-none text-right">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 inline-block">
            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Global Health Index</div>
            <div className="text-3xl font-bold text-emerald-400 mt-1">{aircraft.globalHealthScore}%</div>
          </div>
        </div>

        <div className="w-full h-full cursor-move">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-primary-400">
              Loading Digital Twin...
            </div>
          }>
            <Canvas camera={{ position: [10, 5, 10], fov: 45 }}>
              <color attach="background" args={['#0a0a0a']} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              
              <AircraftModel />
              
              <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={20} blur={2} far={10} />
              <Environment preset="city" />
              <OrbitControls 
                enablePan={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 1.5}
                minDistance={10}
                maxDistance={30}
              />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

// A basic placeholder aircraft assembled from primitives
export function AircraftModel() {
  const group = useRef<THREE.Group>(null);
  const { aircraft } = useStore();

  // Slow rotation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return "#10b981"; // emerald-500
      case 'Warning': return "#f59e0b"; // amber-500
      case 'Critical': return "#ef4444"; // rose-500
      default: return "#9ca3af";
    }
  };

  const Hotspot = ({ position, label, status, score }: { position: [number, number, number], label: string, status: string, score: number }) => {
    const [hovered, setHover] = useState(false);
    const color = getStatusColor(status);

    return (
      <group position={position}>
        <mesh 
          onPointerOver={() => setHover(true)} 
          onPointerOut={() => setHover(false)}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {hovered && (
          <Html center distanceFactor={15} zIndexRange={[100, 0]}>
            <div className="bg-black/80 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-lg whitespace-nowrap shadow-xl pointer-events-none">
              <div className="font-bold text-sm">{label}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-300">Health: {score}%</span>
              </div>
            </div>
          </Html>
        )}
      </group>
    );
  };

  return (
    <group ref={group}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 10, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wings */}
      <mesh position={[0, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.2, 12, 2]} />
        <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, -4.5, 1]} rotation={[Math.PI / 8, 0, 0]}>
        <boxGeometry args={[0.2, 2, 2]} />
        <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Hotspots */}
      {/* Engine (Wing mounted) */}
      <Hotspot 
        position={[3, -1, 0.5]} 
        label="Turbofan Engine (R)" 
        status={aircraft.engine.status} 
        score={aircraft.engine.score} 
      />
      <Hotspot 
        position={[-3, -1, 0.5]} 
        label="Turbofan Engine (L)" 
        status={aircraft.engine.status} 
        score={aircraft.engine.score} 
      />
      
      {/* APU (Tail) */}
      <Hotspot 
        position={[0, -5, 0]} 
        label="Auxiliary Power Unit" 
        status={aircraft.apu.status} 
        score={aircraft.apu.score} 
      />

      {/* Landing Gear (Under wings) */}
      <Hotspot 
        position={[2, -1, -1]} 
        label="Main Landing Gear" 
        status={aircraft.landingGear.status} 
        score={aircraft.landingGear.score} 
      />

      {/* ECS (Fuselage) */}
      <Hotspot 
        position={[0, 1, -1]} 
        label="Environmental Control" 
        status={aircraft.ecs.status} 
        score={aircraft.ecs.score} 
      />
    </group>
  );
}

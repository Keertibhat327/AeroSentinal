import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';

interface CouplingEffectProps {
  startNode: THREE.Mesh;
  endNode: THREE.Mesh;
  intensity: number;
}

export function CouplingEffect({ startNode, endNode, intensity }: CouplingEffectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);

  // Compute curve between the two zones
  const curve = useMemo(() => {
    // Get world positions of the centers of the geometries
    startNode.geometry.computeBoundingBox();
    endNode.geometry.computeBoundingBox();
    
    const startBox = startNode.geometry.boundingBox!;
    const endBox = endNode.geometry.boundingBox!;
    
    const startPos = new THREE.Vector3();
    startBox.getCenter(startPos);
    startNode.localToWorld(startPos);

    const endPos = new THREE.Vector3();
    endBox.getCenter(endPos);
    endNode.localToWorld(endPos);

    // Create a curved path (CatmullRomCurve3)
    const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
    midPoint.y += 2; // Arch the curve upwards
    midPoint.z += 1;

    return new THREE.CatmullRomCurve3([startPos, midPoint, endPos]);
  }, [startNode, endNode]);

  useFrame((state) => {
    if (!particleRef.current) return;
    // Animate particle along the curve
    const t = (state.clock.elapsedTime * (1 + intensity)) % 1;
    const point = curve.getPoint(t);
    particleRef.current.position.copy(point);
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={2 * intensity} // width of the trail
        color={'#f59e0b'} // amber color indicating the alert
        length={4} // length of the trail
        decay={1} // how fast the trail fades
        local={false} // Use world coordinates
        stride={0}
        interval={1}
      >
        <mesh ref={particleRef}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0} />
        </mesh>
      </Trail>
    </group>
  );
}

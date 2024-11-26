import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { Points as ThreePoints } from 'three';

interface SwarmParticle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  target: THREE.Vector3;
  phase: number;
  group: number;
}

const SWARM_COUNT = 3;
const PARTICLES_PER_SWARM = 300;
const SWARM_RADIUS = 2;
const PARTICLE_SPEED = 0.02;
const DAMPING = 0.95;

export default function Scene3D() {
  const pointsRef = useRef<ThreePoints>(null);
  const swarmRef = useRef<SwarmParticle[]>([]);
  
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(SWARM_COUNT * PARTICLES_PER_SWARM * 3);
    const colors = new Float32Array(SWARM_COUNT * PARTICLES_PER_SWARM * 3);
    swarmRef.current = [];
    
    for (let swarm = 0; swarm < SWARM_COUNT; swarm++) {
      const swarmColor = new THREE.Color();
      swarmColor.setHSL(swarm / SWARM_COUNT, 0.8, 0.5);
      
      for (let i = 0; i < PARTICLES_PER_SWARM; i++) {
        const idx = swarm * PARTICLES_PER_SWARM + i;
        const angle = (i / PARTICLES_PER_SWARM) * Math.PI * 2;
        const radius = SWARM_RADIUS + Math.random() * 0.5;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 2;
        
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;
        
        colors[idx * 3] = swarmColor.r;
        colors[idx * 3 + 1] = swarmColor.g;
        colors[idx * 3 + 2] = swarmColor.b;
        
        swarmRef.current.push({
          position: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(),
          target: new THREE.Vector3(),
          phase: Math.random() * Math.PI * 2,
          group: swarm
        });
      }
    }
    
    return { positions, colors };
  }, []);

  const updateSwarmBehavior = (time: number) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    swarmRef.current.forEach((particle, i) => {
      particle.phase += 0.01;
      
      const swarmAngle = time * 0.5 + (particle.group * Math.PI * 2) / SWARM_COUNT;
      const swarmCenter = new THREE.Vector3(
        Math.cos(swarmAngle) * SWARM_RADIUS,
        Math.sin(swarmAngle) * SWARM_RADIUS,
        Math.sin(time * 0.3 + particle.group) * 0.5
      );
      
      const orbitRadius = 0.5 + Math.sin(particle.phase) * 0.2;
      const orbitAngle = particle.phase * 2;
      const orbit = new THREE.Vector3(
        Math.cos(orbitAngle) * orbitRadius,
        Math.sin(orbitAngle) * orbitRadius,
        Math.sin(particle.phase) * 0.2
      );
      
      particle.target.copy(swarmCenter).add(orbit);
      
      const direction = particle.target.clone().sub(particle.position);
      particle.velocity.add(direction.multiplyScalar(PARTICLE_SPEED));
      particle.velocity.multiplyScalar(DAMPING);
      particle.position.add(particle.velocity);
      
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    updateSwarmBehavior(time);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <Points ref={pointsRef}>
        <PointMaterial
          transparent
          vertexColors
          size={3}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaMap={particleTexture}
          alphaTest={0.01}
        />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
      </Points>
    </>
  );
}
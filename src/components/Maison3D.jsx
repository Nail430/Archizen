import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

// Composant pour la maison
function Maison() {
  const toitRef = useRef();
  
  useFrame(() => {
    if (toitRef.current) {
      toitRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Structure principale */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#d4a76a" />
      </mesh>
      
      {/* Toit */}
      <mesh ref={toitRef} position={[0, 2.5, 0]} rotation={[0, Math.PI/4, 0]}>
        <coneGeometry args={[1.8, 1.5, 4]} />
        <meshStandardMaterial color="#b74a4a" />
      </mesh>
      
      {/* Porte */}
      <mesh position={[0, 0.5, 1.01]}>
        <boxGeometry args={[0.6, 1, 0.1]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* Fenêtres */}
      {[
        { position: [-0.8, 1.5, 1.01] },
        { position: [0.8, 1.5, 1.01] },
        { position: [1.01, 1.5, 0] },
        { position: [1.01, 1.5, -0.8] },
        { position: [-1.01, 1.5, 0] },
        { position: [-1.01, 1.5, -0.8] },
      ].map((window, idx) => (
        <mesh key={idx} position={window.position}>
          <boxGeometry args={[0.4, 0.4, 0.1]} />
          <meshStandardMaterial color="#64b5f6" transparent opacity={0.7} />
        </mesh>
      ))}
      
      {/* Cheminée */}
      <mesh position={[0.7, 2.8, 0.7]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

function Maison3D() {
  return (
    <Canvas style={{ height: '600px', background: 'linear-gradient(135deg, #6a93cb 0%, #a4bfef 100%)' }}>
      <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
      
      {/* Éclairage */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#ffd9b3" />
      
      {/* Environnement */}
      <Environment preset="sunset" />
      <ContactShadows opacity={0.4} scale={10} blur={1} far={10} resolution={256} color="#000000" />
      
      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#6da375" />
      </mesh>
      
      {/* Herbe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4caf50" wireframe wireframeLinewidth={1} />
      </mesh>
      
      {/* Maison */}
      <Maison />
      
      {/* Arbres */}
      {[-4, -2, 2, 4].map((x, idx) => (
        <group key={idx} position={[x, 0, -3]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
            <meshStandardMaterial color="#8d6e63" />
          </mesh>
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[1.2, 2, 8]} />
            <meshStandardMaterial color="#2e7d32" />
          </mesh>
        </group>
      ))}
      
      {/* Contrôles */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

export default Maison3D;
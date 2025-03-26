import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { DeformerController } from './DeformerController';
import { Deformer } from 'three-deformer';

export const CanvasArea = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 'orange',
    flatShading: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  const deformer = new Deformer(mesh);

  deformer.addTwist();
  deformer.apply();

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [2, 2, 5], fov: 60 }}
    >
      <ambientLight />
      <directionalLight position={[3, 3, 3]} />
      <DeformerController mesh={mesh} deformer={deformer} />
    </Canvas>
  );
};

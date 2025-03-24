import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'


export const CanvasArea = () => {
  return (
    <Canvas camera={{ position: [2, 2, 5], fov: 60 }}>
      <ambientLight />
      <directionalLight position={[3, 3, 3]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls/>
    </Canvas>
  )
}

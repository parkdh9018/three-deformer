import MonacoEditor from '@monaco-editor/react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

const text1 = `import * as THREE from 'three';
import { Deformer } from 'three-deformer';

const mesh = new THREE.Mesh(geometry, material);

// 1. Create a Deformer instance
const deformer = new Deformer(mesh);

// 2. Add a bend deformer
deformer.addBendDeformer();

// 3. Apply the deformer(s) to the mesh
deformer.applyDeformers();

// 4. Optionally, adjust the deformation weight
deformer.setWeight('bend', 0.5);`;

export const Page = () => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2, 32, 32, 32),
    new THREE.MeshStandardMaterial({ color: 'orange' }),
  );
  const deformer = new Deformer(mesh);
  deformer.addTwistDeformer();
  deformer.applyDeformers();
  deformer.setWeight('twist', 0.5);

  return (
    <div className="h-full w-full flex bg-base-100">
      <div className="max-w-4xl mx-auto px-7 mt-16">
        <h3 className="text-6xl font-bold py-6">Getting started</h3>
        <div className="divider" />
        <div className="py-4 px-6">
          <h3 className="text-2xl font-bold text-md mb-6">Basic Example</h3>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            The three-deformer library provides a simple and flexible way to
            apply geometric deformations (such as bend, twist, taper, etc.) to
            Mesh objects in a Three.js scene. Below is a minimal example
            demonstrating how to use the library
          </p>
          <div className="flex gap-5 flex-row px-3">
            <div className="basis-1/2 py-10">
              <MonacoEditor
                theme="vs-dark"
                height="350px"
                language="javascript"
                defaultValue={text1}
                options={{
                  readOnly: true,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  minimap: { enabled: false },
                  scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden',
                  },
                  lineNumbers: 'off',
                  overviewRulerLanes: 0,
                }}
              />
            </div>
            <div className="basis-1/2 py-10 ">
              <Canvas
                style={{ backgroundColor: 'skyblue', borderRadius: '10px' }}
              >
                <primitive object={mesh} position={[0, 0, 0]} />
                <ambientLight color={'white'} intensity={1.5} />
                <directionalLight
                  color={'white'}
                  intensity={1.5}
                  position={[1, 1, 1]}
                />
                <OrbitControls />
              </Canvas>
            </div>
          </div>
          <div className="bg-accent p-5 rounded-lg text-accent-content opacity-80">
            <p className="text-2xl font-bold text-md mb-6">💡 Important</p>
            After adding any deformer, you must call{' '}
            <span className="font-bold">applyDeformers()</span> for it to take
            effect on your mesh.
          </div>
        </div>
      </div>
    </div>
  );
};

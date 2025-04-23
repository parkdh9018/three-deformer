import { useMemo, useState } from 'react';
import { CodeAndCanvas } from '../PageComponents/CodeAndCanvas';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';
import { ApiLink } from '../PageComponents/ApiLink';

const code = `
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2, 32, 32, 32),
  new THREE.MeshStandardMaterial(
    { color: 'orange' }
  ),
);
const mesh = new THREE.Mesh(geometry, material);

// 1. Create a Deformer instance
const deformer = new Deformer(mesh);

// 2. Add a bend deformer
deformer.addBendDeformer();

// 3. Apply the deformer(s) to the mesh
deformer.applyDeformers();

// 4. adjust the deformation weight
deformer.setWeight('bend', 0.5);`;

export const Section1 = () => {
  const [value, setValue] = useState(50);

  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    return new THREE.Mesh(geometry, material);
  }, []);

  const deformer = useMemo(() => {
    const result = new Deformer(mesh);
    result.addDeformer('twist');
    result.applyDeformers();
    result.setWeight('twist', value / 100);
    return result;
  }, [mesh]);

  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    deformer.setWeight('twist', newValue / 100);
  };

  return (
    <>
      <div className="py-4 px-6">
        <h3 className="text-2xl font-bold text-md mb-6">Basic Example</h3>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          The three-deformer library provides a simple and flexible way to apply
          geometric deformations (such as bend, twist, taper, etc.) to Mesh
          objects in a Three.js scene. Below is a minimal example demonstrating
          how to use the library
        </p>
        <CodeAndCanvas code={code} mesh={mesh} deformer={deformer}>
          <div className="flex flex-col w-full gap-3">
            <p className="font-light text-md ml-2">Weight</p>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              className="range range-primary w-full range-sm"
              onChange={onChangeWeight}
            />
          </div>
        </CodeAndCanvas>
        <div className="bg-accent p-5 rounded-lg text-accent-content opacity-80">
          <p className="text-2xl font-bold text-md mb-6">💡 Important</p>
          After adding any deformer, you must call{' '}
          <ApiLink functionName="applyDeformers" colorName="neutral" />
          for it to take effect on your mesh.
        </div>
      </div>
    </>
  );
};

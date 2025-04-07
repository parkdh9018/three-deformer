import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Deformer, EffectType } from 'three-deformer';
import { CodeAndCanvas } from '../PageComponents/CodeAndCanvas';

const text1 = `
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

const text2 = `
deformer.addTaperDeformer();
deformer.updateOption('taper', {
  axis: 'x'
  curveType : 'linear',
})
`;
const createDeformerExample = (deformerName: EffectType) => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2, 32, 32, 32),
    new THREE.MeshStandardMaterial({ color: 'orange' }),
  );
  const deformer = new Deformer(mesh);
  deformer.addDeformer(deformerName);
  deformer.applyDeformers();
  return { mesh, deformer };
};

export const Page = () => {
  const [value, setValue] = useState(50);
  const [value2, setValue2] = useState(50);

  // basic example
  const { mesh, deformer } = createDeformerExample('twist');
  useEffect(() => {
    deformer.setWeight('twist', value / 100);
  }, [value]);

  // option example
  const { mesh: mesh2, deformer: deformer2 } = createDeformerExample('taper');
  useEffect(() => {
    deformer2.setWeight('taper', value2 / 100);
  }, [value2]);

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
          <CodeAndCanvas code={text1} mesh={mesh} deformer={deformer}>
            <div className="flex flex-col w-full gap-3">
              <p className="font-light text-md ml-2">Weight</p>
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                className="range range-primary w-full range-sm"
                onChange={e => {
                  setValue(Number(e.target.value));
                }}
              />
            </div>
          </CodeAndCanvas>
          <div className="bg-accent p-5 rounded-lg text-accent-content opacity-80">
            <p className="text-2xl font-bold text-md mb-6">💡 Important</p>
            After adding any deformer, you must call{' '}
            <span className="font-bold">applyDeformers()</span> for it to take
            effect on your mesh.
          </div>
        </div>
        <div className="py-4 px-6">
          <div className="divider" />
          <h3 className="text-2xl font-bold text-md mb-6">Update Option</h3>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            You can selectively update only the options you care about using{' '}
            <code>updateOption</code>. In this case, taper is applied along the{' '}
            <b>x-axis</b> with a <b>linear</b> curve — all other defaults are
            preserved. preserved.
          </p>
          <CodeAndCanvas
            code={text2}
            mesh={mesh2}
            deformer={deformer2}
            height="150px"
          >
            <div className="flex flex-col w-full gap-3">
              <p className="font-light text-md ml-2">Weight</p>
              <input
                type="range"
                min={0}
                max={100}
                value={value2}
                className="range range-primary w-full range-sm"
                onChange={e => {
                  setValue2(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="font-light text-md ml-2">Curve Type</p>
              <select
                defaultValue="Small"
                className="select select-sm"
                onChange={e => {
                  deformer2.updateOption('taper', {
                    curveType: e.target.value as 'linear',
                  });
                }}
              >
                <option>linear</option>
                <option>quadratic</option>
                <option>sin</option>
                <option>cubic</option>
              </select>
            </div>
          </CodeAndCanvas>
        </div>
      </div>
    </div>
  );
};

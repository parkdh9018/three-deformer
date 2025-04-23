import { useMemo, useState } from 'react';
import { CodeAndCanvas } from '../PageComponents/CodeAndCanvas';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';
import { ApiLink } from '../PageComponents/ApiLink';
const code = `
// Add initial twist deformer
deformer.addDeformer('twist');
deformer.applyDeformers();

// Set custom matrix and weight
const _matrix = new THREE.Matrix4();
_matrix.makeScale(3, 0, 0);
_matrix.setPosition(0, 1, 0);
deformer.updateMatrix('twist', _matrix);
deformer.setWeight('twist', 0.5);

// Bake the deformation into the geometry
deformer.bakeDeformers();

// Add a new twist deformer on top (using Y axis)
deformer.addDeformer('twist');
deformer.updateOption('twist', { axis: 'y' });
deformer.applyDeformers();
`;
export const Section4 = () => {
  const [twistValue, setTwistValue] = useState(0);

  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    return new THREE.Mesh(geometry, material);
  }, []);

  const deformer = useMemo(() => {
    const result = new Deformer(mesh);
    result.addDeformer('twist');
    result.applyDeformers();

    const _matrix = new THREE.Matrix4();
    _matrix.makeScale(3, 0, 0);
    _matrix.setPosition(0, 1, 0);
    result.updateMatrix('twist', _matrix);
    result.setWeight('twist', 0.5);

    result.bakeDeformers();

    result.addDeformer('twist');
    result.updateOption('twist', { axis: 'y' });
    result.applyDeformers();

    return result;
  }, [mesh]);

  const onChangeTwistWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setTwistValue(newValue);
    deformer.setWeight('twist', newValue / 100);
  };

  return (
    <div className="py-4 px-6">
      <div className="divider" />
      <h3 className="text-2xl font-bold text-md mb-6">
        Bake and Reapply Deformers
      </h3>
      <p className="font-light text-gray-400 sm:text-xl mb-4">
        This example demonstrates how to bake an applied deformation into the
        geometry, then apply a new deformation on top of it.
      </p>
      <ul className="list-disc pl-8 text-gray-500 space-y-1 sm:text-xl">
        <li>Apply a twist deformer with a custom matrix and weight</li>
        <li>
          Use <ApiLink functionName="bakeDeformers" />
          to permanently apply the deformation
        </li>
        <li>Add another twist deformer using a different axis</li>
      </ul>
      <CodeAndCanvas code={code} mesh={mesh} deformer={deformer} height="500px">
        <div className="flex flex-col w-full gap-3">
          <p className="font-light text-md ml-2">Twist Weight</p>
          <input
            type="range"
            min={0}
            max={100}
            value={twistValue}
            className="range range-primary w-full range-sm"
            onChange={onChangeTwistWeight}
          />
        </div>
      </CodeAndCanvas>
      <div className="bg-accent p-5 rounded-lg text-accent-content opacity-80">
        <p className="text-2xl font-bold text-md mb-6">💡 Important</p>
        <ApiLink functionName="bakeDeformers" colorName="neutral" />
        applies the current deformation and clears all deformers. Use it when
        you want to finalize the shape. for it to take effect on your mesh.
      </div>
    </div>
  );
};

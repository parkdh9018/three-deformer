import { useMemo, useState } from 'react';
import { CodeAndCanvas } from '../PageComponents/CodeAndCanvas';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';
import { ApiLink } from '../PageComponents/ApiLink';
const code = `
deformer.addCustomDeformer(
  'wave',
  (vertex, option) => {
    const v = vertex.clone();
    v.y += Math.sin(v.x * option.frequency) * option.amplitude;
    return v;
  },
  {
    frequency: 5,
    amplitude: 0.2,
  }
);
`;
export const Section_custom = () => {
  const [customValue, setCustomValue] = useState(0);

  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    return new THREE.Mesh(geometry, material);
  }, []);

  const deformer = useMemo(() => {
    const result = new Deformer(mesh);

    result.addCustomDeformer(
      'wave',
      (vertex, option) => {
        const v = vertex.clone();
        v.y += Math.sin(v.x * option.frequency) * option.amplitude;
        return v;
      },
      {
        frequency: 5,
        amplitude: 0.2,
      },
    );

    result.applyDeformers();

    return result;
  }, [mesh]);

  const onChangeTwistWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCustomValue(newValue);
    deformer.setWeight('wave', newValue / 100);
  };

  return (
    <div className="py-4 px-6">
      <div className="divider" />
      <h3 className="text-2xl font-bold text-md mb-6">
        Define Your Own Effect
      </h3>
      <p className="font-light text-gray-400 sm:text-xl mb-4">
        The <ApiLink functionName="addCustomDeformer" />
        method allows you to create a unique deformation effect by supplying
        your own function.
      </p>
      <p className="font-light text-gray-400 sm:text-xl mb-4">
        In this example, we apply a sine-based wave effect to the mesh. You can
        use any math-based logic to deform the geometry as you like.
      </p>
      <CodeAndCanvas code={code} mesh={mesh} deformer={deformer} height="320px">
        <div className="flex flex-col w-full gap-3">
          <p className="font-light text-md ml-2">Wave Weight</p>
          <input
            type="range"
            min={0}
            max={100}
            value={customValue}
            className="range range-primary w-full range-sm"
            onChange={onChangeTwistWeight}
          />
        </div>
      </CodeAndCanvas>
    </div>
  );
};

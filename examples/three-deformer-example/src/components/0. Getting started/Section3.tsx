import { useMemo, useState } from 'react';
import { CodeAndCanvas } from '../PageComponents/CodeAndCanvas';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';
const code = `
deformer.addTaperDeformer();
deformer.addTwistDeformer();

deformer.applyDeformers();

deformer.setWeight('twist', 0.5);
deformer.setWeight('taper', 0.5);
`;
export const Section3 = () => {
  const [twistValue, setTwistValue] = useState(50);
  const [taperValue, setTaperValue] = useState(50);

  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    return new THREE.Mesh(geometry, material);
  }, []);

  const deformer = useMemo(() => {
    const result = new Deformer(mesh);
    result.addDeformer('twist');
    result.addDeformer('taper');
    result.applyDeformers();
    result.setWeight('twist', twistValue / 100);
    result.setWeight('taper', taperValue / 100);
    return result;
  }, [mesh]);

  const onChangeTwistWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setTwistValue(newValue);
    deformer.setWeight('twist', newValue / 100);
  };

  const onChangeTaperWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setTaperValue(newValue);
    deformer.setWeight('taper', newValue / 100);
  };
  return (
    <div className="py-4 px-6">
      <div className="divider" />
      <h3 className="text-2xl font-bold text-md mb-6">
        Apply multiple deformers
      </h3>
      <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
        You can apply multiple deformers to a single mesh. Each deformer works
        independently, so you can mix and match them freely without worrying
        about order.
      </p>
      <CodeAndCanvas code={code} mesh={mesh} deformer={deformer} height="180px">
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
        <div className="flex flex-col w-full gap-3">
          <p className="font-light text-md ml-2">Taper Weight</p>
          <input
            type="range"
            min={0}
            max={100}
            value={taperValue}
            className="range range-primary w-full range-sm"
            onChange={onChangeTaperWeight}
          />
        </div>
      </CodeAndCanvas>
    </div>
  );
};

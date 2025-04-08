import { useMemo, useState } from 'react';
import { CodeAndCanvas } from '../PageComponents/CodeAndCanvas';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

const code = `
deformer.addTaperDeformer();
deformer.updateOption('taper', {
  axis: 'x'
  curveType : 'linear',
})
`;

const OPTIONS = ['linear', 'quadratic', 'sin', 'cubic'];

export const Section2 = () => {
  const [value, setValue] = useState(50);

  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    return new THREE.Mesh(geometry, material);
  }, []);

  const deformer = useMemo(() => {
    const result = new Deformer(mesh);
    result.addDeformer('taper');
    result.applyDeformers();
    result.setWeight('taper', value / 100);
    return result;
  }, [mesh]);

  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    deformer.setWeight('taper', newValue / 100);
  };

  const onChangeCurveType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    deformer.updateOption('taper', {
      curveType: e.target.value as 'linear',
    });
  };

  return (
    <div className="py-4 px-6">
      <div className="divider" />
      <h3 className="text-2xl font-bold text-md mb-6">Update Option</h3>
      <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
        You can selectively update only the options you care about using{' '}
        <code>updateOption</code>. In this case, taper is applied along the{' '}
        <b>x-axis</b> with a <b>linear</b> curve — all other defaults are
        preserved. preserved.
      </p>
      <CodeAndCanvas code={code} mesh={mesh} deformer={deformer} height="150px">
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
        <div className="flex flex-col w-full gap-3">
          <p className="font-light text-md ml-2">Curve Type</p>
          <select
            defaultValue="Small"
            className="select select-sm"
            onChange={onChangeCurveType}
          >
            {OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </CodeAndCanvas>
    </div>
  );
};

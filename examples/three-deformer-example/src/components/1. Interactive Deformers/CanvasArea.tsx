import * as THREE from 'three';
import { CurveType, Deformer } from 'three-deformer';
import { useRecoilValue } from 'recoil';
import { customFunctionSelector } from '../../state/atoms/customFunctionAtom';
import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from '@react-three/drei';
import { DeformerController } from './DeformerController';
import { EffectTypeWithCustom } from '../../types/deformerType';

type Props = {
  selected: EffectTypeWithCustom;
};

export const CanvasArea = ({ selected }: Props) => {
  const customFunction = useRecoilValue(customFunctionSelector);

  const mesh = new THREE.Mesh();
  mesh.geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
  mesh.material = new THREE.MeshPhongMaterial({
    color: 'orange',
    flatShading: true,
  });

  const deformer = new Deformer(mesh);
  if (selected !== 'custom') {
    deformer.addDeformer(selected);
  } else {
    deformer.registerEffect('custom', customFunction);
  }
  deformer.applyDeformers();

  const deformerOptions: Record<EffectTypeWithCustom, object> = {
    twist: {
      strength: {
        value: 2,
        min: 1,
        max: 4,
        onChange: (value: number) => {
          deformer.updateOption('twist', { strength: value });
        },
      },
    },
    taper: {
      curveType: {
        options: ['linear', 'quadratic', 'sin', 'cubic'],
        value: 'linear',
        onChange: (value: CurveType) => {
          deformer.updateOption('taper', { curveType: value });
        },
      },
    },
    bend: {
      angle: {
        value: 0,
        min: 0,
        max: 360,
        onChange: (value: number) => {
          deformer.updateOption('bend', { angle: value });
        },
      },
    },
    custom: {},
  };

  return (
    <Canvas className="bg-base-300" camera={{ position: [2, 2, 5], fov: 60 }}>
      <ambientLight />
      <directionalLight position={[3, 3, 3]} />
      {selected && (
        <DeformerController
          key={mesh.uuid}
          name={selected}
          mesh={mesh}
          deformer={deformer}
          option={deformerOptions[selected]}
        />
      )}
      <OrbitControls makeDefault />
      <Grid
        args={[30, 30]}
        cellColor={`#6f6f6f`}
        sectionSize={3}
        sectionThickness={1.5}
        sectionColor={'#9d4b4b'}
      />
      <GizmoHelper alignment="top-left" margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
          labelColor="white"
        />
      </GizmoHelper>
    </Canvas>
  );
};

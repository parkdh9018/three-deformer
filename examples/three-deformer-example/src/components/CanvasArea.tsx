import * as THREE from 'three';
import { DeformerController } from './DeformerController';
import { CurveType, Deformer } from 'three-deformer';
import * as S from './CanvasArea.styled';
import { useRecoilValue } from 'recoil';
import {
  EffectTypeWithCustom,
  selectedDeformerState,
} from '../state/atoms/deformerAtom';
import { customFunctionSelector } from '../state/atoms/customFunctionAtom';

export const CanvasArea = () => {
  const selected = useRecoilValue(selectedDeformerState);
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
    <S.StyledCanvas camera={{ position: [2, 2, 5], fov: 60 }}>
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
    </S.StyledCanvas>
  );
};

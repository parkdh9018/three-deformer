import * as THREE from 'three';
import { DeformerController } from './DeformerController';
import { Deformer } from 'three-deformer';
import * as S from './CanvasArea.styled';
import { useRecoilValue } from 'recoil';
import { selectedDeformerState } from '../state/atoms/deformerAtom';

export const CanvasArea = () => {
  const selected = useRecoilValue(selectedDeformerState);

  const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 'orange',
    flatShading: true,
  });

  const mesh = new THREE.Mesh(geometry, material);

  const deformer = new Deformer(mesh);
  deformer.addDeformer(selected);
  deformer.apply();

  const TaperOption = {
    curveType: {
      options: ['linear', 'quadratic', 'sin', 'cubic'],
      value: 'linear',
      onChange: (value: string) => {
        deformer.setOption(selected, { curveType: value });
      },
    },
  };

  return (
    <S.StyledCanvas camera={{ position: [2, 2, 5], fov: 60 }}>
      <ambientLight />
      <directionalLight position={[3, 3, 3]} />
      {selected === 'twist' && (
        <DeformerController name={selected} mesh={mesh} deformer={deformer} />
      )}
      {selected === 'taper' && (
        <DeformerController
          name={selected}
          mesh={mesh}
          deformer={deformer}
          option={TaperOption}
        />
      )}
      {selected === 'bend' && (
        <DeformerController name={selected} mesh={mesh} deformer={deformer} />
      )}
    </S.StyledCanvas>
  );
};

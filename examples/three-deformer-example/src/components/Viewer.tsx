import { useRecoilValue } from 'recoil';
import { CanvasArea } from './CanvasArea';
import { selectedDeformerState } from '../state/atoms/deformerAtom';
import * as S from './Viewer.styled';

export const Viewer = () => {
  const selected = useRecoilValue(selectedDeformerState);

  return (
    <S.Wrapper>
      <S.DeformerName>{selected}</S.DeformerName>
      <CanvasArea />
    </S.Wrapper>
  );
};

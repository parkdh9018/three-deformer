import { useSetRecoilState } from 'recoil';
import * as S from './Sidebar.styled';
import { selectedDeformerState } from '../state/atoms/deformerAtom';

export const Sidebar = () => {
  const setSelected = useSetRecoilState(selectedDeformerState);

  const onClickTwist = () => {
    setSelected('twist');
  };

  const onClickTaper = () => {
    setSelected('taper');
  };

  return (
    <S.Wrapper>
      <S.StyledUi>
        <S.StyledLi onClick={onClickTwist}>Twist</S.StyledLi>
        <S.StyledLi onClick={onClickTaper}>Taper</S.StyledLi>
      </S.StyledUi>
    </S.Wrapper>
  );
};

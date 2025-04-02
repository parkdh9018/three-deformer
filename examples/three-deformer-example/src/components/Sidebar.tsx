import { useSetRecoilState } from 'recoil';
import * as S from './Sidebar.styled';
import {
  deformerTypeList,
  selectedDeformerState,
} from '../state/atoms/deformerAtom';

export const Sidebar = () => {
  const setSelected = useSetRecoilState(selectedDeformerState);

  return (
    <S.Wrapper>
      <S.StyledUi>
        {deformerTypeList.map(name => (
          <S.StyledLi
            key={name}
            onClick={() => {
              setSelected(name);
            }}
          >
            {name}
          </S.StyledLi>
        ))}
      </S.StyledUi>
    </S.Wrapper>
  );
};

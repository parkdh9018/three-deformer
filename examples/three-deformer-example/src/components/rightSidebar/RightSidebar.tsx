import { DeformerFunctionEditor } from './DeformerFunctionEditor';
import * as S from './RightSideBar.styled';

export const RightSidebar = () => {
  return (
    <S.Wrapper>
      code
      <DeformerFunctionEditor />
    </S.Wrapper>
  );
};

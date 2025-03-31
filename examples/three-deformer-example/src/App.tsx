import { Sidebar } from './components/Sidebar';
import { Viewer } from './components/Viewer';
import * as S from './App.styled';
import { useRecoilValue } from 'recoil';
import { selectedDeformerState } from './state/atoms/deformerAtom';
import { RightSidebar } from './components/rightSidebar/RightSidebar';

function App() {
  const selected = useRecoilValue(selectedDeformerState);

  return (
    <S.StyledApp $isCustom={selected === 'custom'}>
      <Sidebar />
      <Viewer />
      {selected === 'custom' && <RightSidebar />}
    </S.StyledApp>
  );
}

export default App;

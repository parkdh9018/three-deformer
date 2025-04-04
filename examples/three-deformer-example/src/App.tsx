import { Sidebar } from './components/Sidebar';
import { Viewer } from './components/1. Interactive Deformers/Viewer';
import './app.css';
import { Leva } from 'leva';
import { pageIndexState } from './state/atoms/pageIndexAtom';
import { useRecoilValue } from 'recoil';
import { Page } from './components/0. Getting started/Page';

function App() {
  const pageIndex = useRecoilValue(pageIndexState);

  return (
    <div className="flex flex-row">
      <div className="basis-2xs bg-base-200">
        <Sidebar />
      </div>
      <div className="basis-full">
        {pageIndex !== 0 ? <Viewer /> : <Page />}
      </div>
      <div style={{ position: 'absolute', top: 62, right: 10 }}>
        <Leva fill />
      </div>
    </div>
  );
}

export default App;

import { Sidebar } from './components/Sidebar';
import { Viewer } from './components/1. Interactive Deformers/Viewer';
import './app.css';
import { Leva } from 'leva';
import { Page } from './components/0. Getting started/Page';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-row">
      <div className="basis-2xs bg-base-200">
        <Sidebar />
      </div>
      <div className="basis-full">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/twist" element={<Viewer selected="twist" />} />
          <Route path="/taper" element={<Viewer selected="taper" />} />
          <Route path="/bend" element={<Viewer selected="bend" />} />
          <Route path="/custom" element={<Viewer selected="custom" />} />
        </Routes>
      </div>
      <div style={{ position: 'absolute', top: 62, right: 10 }}>
        <Leva fill />
      </div>
    </div>
  );
}

export default App;

import { Sidebar } from './components/Sidebar';
import { Viewer } from './components/Viewer';
import './app.css';
import { CustomCodeSandbox } from './components/CustomCodeSandbox';
import { Leva } from 'leva';

function App() {
  return (
    <div className="grid grid-cols-5">
      <div className="cols-span-1">
        <Sidebar />
      </div>
      <div className="col-span-4">
        <Viewer />
      </div>
      <CustomCodeSandbox />
      <div style={{ position: 'absolute', top: 62, right: 10 }}>
        <Leva fill />
      </div>
    </div>
  );
}

export default App;

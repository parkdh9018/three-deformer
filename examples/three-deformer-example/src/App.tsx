import { Sidebar } from './components/Sidebar';
import { Viewer } from './components/1. Interactive Deformers/Viewer';
import './app.css';
import { Leva } from 'leva';
import { Page } from './components/0. Getting started/StartedPage';
import { Route, Routes } from 'react-router-dom';
import { ApiPage } from './components/2. API/ApiPage';
import menuIcon from './assets/burger-menu-white.svg';

function App() {
  const onClickSidebar = () => {
    const check = document.querySelector('#my-drawer') as HTMLInputElement;

    if (!check) return;

    check.checked = false;
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex flex-row">
            <div className="basis-2xs bg-base-200 hidden md:block">
              <Sidebar />
            </div>
            <div className="basis-full">
              <label htmlFor="my-drawer">
                <img
                  src={menuIcon}
                  className="btn  drawer-button absolute top-3 right-0 block md:hidden"
                  width="20px"
                  height="20px"
                />
              </label>

              <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/twist" element={<Viewer selected="twist" />} />
                <Route path="/taper" element={<Viewer selected="taper" />} />
                <Route path="/bend" element={<Viewer selected="bend" />} />
                <Route path="/custom" element={<Viewer selected="custom" />} />
                <Route path="/api" element={<ApiPage />} />
              </Routes>
            </div>
            <div style={{ position: 'absolute', top: 62, right: 10 }}>
              <Leva fill />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className="menu bg-base-200 text-base-content min-h-full w-80 p-4"
            onClick={onClickSidebar}
          >
            <Sidebar />
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

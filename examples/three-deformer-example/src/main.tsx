import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter basename="/three-deformer/">
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
);

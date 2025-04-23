import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToAnchor = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
      }
    }
  }, [location]);

  return null;
};

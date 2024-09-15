import { useState, useRef, useEffect } from 'react';
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import Loader from './components/pages/Loader';
import Page1 from './components/pages/Page1';

export default function App() {
  const [locked, setLocked] = useState(true);
  const scrollbar = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLocked(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(window.innerWidth < 640) return;
    window.addEventListener('resize', () => window.location.reload());
  }, [])


  return (
    <>
      <Loader />
      <Page1 />
      <SmoothScrollbar locked={locked} ref={scrollbar} />
      <GlobalCanvas style={{ pointerEvents: 'none' }} flat />
    </>
  );
}

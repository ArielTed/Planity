import { useEffect, useState } from 'react';
import { WindowSize } from './types';

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ height: window.innerHeight, width: window.innerWidth });

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', windowSizeHandler);

    return () => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;

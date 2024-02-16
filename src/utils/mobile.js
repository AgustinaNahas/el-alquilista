import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({width:window.innerWidth,height:window.innerHeight});
    };

    if (typeof window !== 'undefined') {
      setWindowSize({width:window.innerWidth,height:window.innerHeight});
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
};

const IsMobile = () => {
    const [mobile, setMobile] = useState(false);
  
    useEffect(() => {
      const handleWindowResize = () => {
        setMobile(window.innerWidth < 800);
      };
  
      if (typeof window !== 'undefined') {
        setMobile(window.innerWidth < 800);
        window.addEventListener('resize', handleWindowResize);
      }
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
  
    return mobile;
};

export { useWindowSize } ;
export { IsMobile };
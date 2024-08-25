import { useEffect } from 'react';

const useCloseOnScroll = (closeHandler: VoidFunction) => {
  useEffect(() => {
    document.addEventListener('scroll', closeHandler);

    return () => {
      document.removeEventListener('scroll', closeHandler);
    };
  }, []);
};

export { useCloseOnScroll };

import { useEffect } from 'react';

export const useCloseOnScroll = (closeHandler: VoidFunction) => {
  useEffect(() => {
    document.addEventListener('scroll', closeHandler);

    return () => {
      document.removeEventListener('scroll', closeHandler);
    };
  }, []);
};

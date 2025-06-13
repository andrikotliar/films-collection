import { useEffect } from 'react';

export const useCloseOnScroll = (
  closeHandler: VoidFunction,
  isEnabled = true,
) => {
  useEffect(() => {
    if (isEnabled) {
      document.addEventListener('scroll', closeHandler);

      return () => {
        document.removeEventListener('scroll', closeHandler);
      };
    }
  }, [isEnabled]);
};

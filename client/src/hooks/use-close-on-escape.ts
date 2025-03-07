import { useEffect } from 'react';

export const useCloseOnEscape = (
  isOpen: boolean,
  closeHandler: VoidFunction,
) => {
  useEffect(() => {
    if (isOpen) {
      const closeOnEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeHandler();
        }
      };

      document.addEventListener('keydown', closeOnEscKey);

      return () => {
        document.removeEventListener('keydown', closeOnEscKey);
      };
    }
  }, [isOpen]);
};

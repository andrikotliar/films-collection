import { RefObject, useEffect } from 'react';

type Options = {
  isOpen: boolean;
  triggerElementRef: RefObject<HTMLButtonElement>;
  containerRef: RefObject<HTMLDivElement>;
  closeHandler: VoidFunction;
};

const useClickOutside = ({
  isOpen,
  triggerElementRef,
  containerRef,
  closeHandler,
}: Options) => {
  const closeMenuHandler = (event: MouseEvent) => {
    if (
      event.target === triggerElementRef.current ||
      event.target === containerRef?.current
    ) {
      return;
    }

    closeHandler();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeMenuHandler);
    }

    return () => {
      document.removeEventListener('click', closeMenuHandler);
    };
  }, [isOpen]);
};

export { useClickOutside };

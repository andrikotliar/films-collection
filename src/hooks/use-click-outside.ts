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
    const path = event.composedPath();
    if (
      path.includes(containerRef.current as EventTarget) ||
      path.includes(triggerElementRef.current as EventTarget)
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

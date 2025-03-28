import { RefObject, useEffect } from 'react';

type Options = {
  isOpen: boolean;
  triggerElementRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLDivElement>;
  closeHandler: VoidFunction;
};

export const useClickOutside = ({
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
      document.body.addEventListener('click', closeMenuHandler);
    }

    return () => {
      document.body.removeEventListener('click', closeMenuHandler);
    };
  }, [isOpen]);
};

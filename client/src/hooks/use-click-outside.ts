import { RefObject, useCallback, useEffect } from 'react';

type Options = {
  isOpen: boolean;
  triggerElementRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLDivElement>;
  isEnabled?: boolean;
  closeHandler: VoidFunction;
};

export const useClickOutside = ({
  isOpen,
  triggerElementRef,
  containerRef,
  isEnabled = true,
  closeHandler,
}: Options) => {
  const closeMenuHandler = useCallback(
    (event: MouseEvent) => {
      const path = event.composedPath();
      if (
        path.includes(containerRef.current as EventTarget) ||
        path.includes(triggerElementRef.current as EventTarget)
      ) {
        return;
      }

      closeHandler();
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen && isEnabled) {
      document.body.addEventListener('mousedown', closeMenuHandler);

      return () => {
        document.body.removeEventListener('mousedown', closeMenuHandler);
      };
    }
  }, [isOpen, isEnabled]);
};

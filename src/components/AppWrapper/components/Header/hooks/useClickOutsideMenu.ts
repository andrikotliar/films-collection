import { RefObject, useEffect } from 'react';

type Options = {
  isOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
  menuRef: RefObject<HTMLDivElement>;
  closeHandler: VoidFunction;
};

const useClickOutsideMenu = ({
  isOpen,
  buttonRef,
  menuRef,
  closeHandler,
}: Options) => {
  const closeMenuHandler = (event: MouseEvent) => {
    if (
      event.target === buttonRef.current ||
      event.target === menuRef?.current
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

export { useClickOutsideMenu };

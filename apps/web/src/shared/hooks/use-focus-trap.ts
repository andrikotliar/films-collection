import { useEffect } from 'react';

type Options = {
  container: HTMLElement | null;
  trigger: HTMLElement | null;
  isOpen: boolean;
  shouldFocusOnClose?: boolean;
};

const queryFocusableElements = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  return focusableElements;
};

export const useFocusTrap = ({
  container,
  trigger,
  isOpen,
  shouldFocusOnClose = true,
}: Options) => {
  useEffect(() => {
    if (container && isOpen) {
      const elements = queryFocusableElements(container);

      const firstElement = elements[0] as HTMLElement;
      const lastElement = elements[elements.length - 1] as HTMLElement;

      const controlFocusWithinContainer = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (document.activeElement === trigger) {
            e.preventDefault();
            firstElement.focus();
            return;
          }

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
            return;
          }

          if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', controlFocusWithinContainer);

      return () => {
        if (shouldFocusOnClose) {
          trigger?.focus();
        }
        document.removeEventListener('keydown', controlFocusWithinContainer);
      };
    }
  }, [container, trigger, isOpen]);
};

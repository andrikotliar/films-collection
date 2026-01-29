import { useEffect } from 'react';

export const useResizeObserver = (handler: VoidFunction, observeElem: HTMLElement): void => {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      handler();
    });

    observer.observe(observeElem);

    return () => {
      observer.disconnect();
    };
  }, [handler]);
};

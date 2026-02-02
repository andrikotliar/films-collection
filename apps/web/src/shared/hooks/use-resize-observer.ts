import { useEffect, useRef } from 'react';

export const useResizeObserver = (handler: VoidFunction, observeElem: HTMLElement | null): void => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      handlerRef.current();
    });

    if (observeElem) {
      observer.observe(observeElem);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
};

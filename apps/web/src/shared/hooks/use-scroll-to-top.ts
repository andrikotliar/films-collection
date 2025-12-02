import { DependencyList, useEffect } from 'react';

export const useScrollToTop = (deps: DependencyList) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, deps);
};

import { DependencyList, useEffect } from 'react';

const useScrollToTop = (deps: DependencyList) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, deps);
};

export { useScrollToTop };

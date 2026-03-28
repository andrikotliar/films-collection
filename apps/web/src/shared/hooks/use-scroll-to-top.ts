import { useEffect } from 'react';

export const useScrollToTop = (deps: React.DependencyList) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, deps);
};

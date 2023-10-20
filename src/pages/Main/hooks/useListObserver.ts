import { FILMS_COUNT_STEP } from '@/common';
import { useFilmsContext } from '@/context';
import { RefCallback, useCallback, useRef } from 'react';

const useListObserver = () => {
  const { isFilmsLoading, hasMore, setFilmsCount } = useFilmsContext();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastFilmRef: RefCallback<HTMLAnchorElement> = useCallback(
    (node) => {
      if (isFilmsLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setFilmsCount((num) => num + FILMS_COUNT_STEP);
        }
      });

      if (node) {
        observer.current?.observe(node);
      }
    },
    [isFilmsLoading, hasMore],
  );

  return lastFilmRef;
};

export { useListObserver };

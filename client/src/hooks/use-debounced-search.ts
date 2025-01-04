import { debounce } from '@/helpers';
import { ChangeEvent, useCallback } from 'react';

type SearchHandler = (value?: string) => void;

export const useDebouncedSearch = (handler: SearchHandler) => {
  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value.length) {
        handler(value);
        return;
      }

      handler();
    },
    [handler],
  );

  const debouncedSearch = debounce(handleSearch, 1000);

  return debouncedSearch;
};

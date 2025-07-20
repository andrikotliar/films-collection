import { debounce } from '@/common';
import { ChangeEvent, useCallback } from 'react';

type SearchHandler = (value: string | null) => void | Promise<void>;

export const useDebouncedSearch = (handler: SearchHandler) => {
  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value.trim().length) {
        handler(value.toLowerCase());
        return;
      }

      handler(null);
    },
    [handler],
  );

  const debouncedSearch = debounce(handleSearch, 1000);

  return debouncedSearch;
};

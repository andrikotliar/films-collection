import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/helpers';

import styles from './Search.module.css';
import { Icons } from '@/components/icons/Icons';

const Search = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const runSearch = (searchValue: string) => {
    if (searchValue.length) {
      navigate(`/?search=${searchValue.toLowerCase()}`);
    }
  };

  const focusSearch = (event: KeyboardEvent) => {
    if (event.key === 'F2' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    runSearch(event.target.value);

    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }, []);

  const debouncedSearch = debounce(handleSearch, 1000);

  useEffect(() => {
    document.addEventListener('keydown', focusSearch);

    return () => {
      document.removeEventListener('keydown', focusSearch);
    };
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search by title..."
        onChange={debouncedSearch}
        ref={searchInputRef}
      />
      <Icons icon="search" className={styles.searchIcon} />
    </div>
  );
};

export { Search };

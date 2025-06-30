import { useDebouncedSearch } from '@/hooks';
import styles from './films-search.module.css';
import { useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export const FilmsSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const debouncedSearch = useDebouncedSearch((value) => {
    navigate({
      to: '/',
      search: {
        title: value,
      },
    });
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  });

  return (
    <div className={styles.search}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="search"
          className={styles.input}
          placeholder="Search films..."
          onChange={debouncedSearch}
          ref={inputRef}
        />
        <SearchIcon className={styles.searchIcon} />
      </div>
    </div>
  );
};

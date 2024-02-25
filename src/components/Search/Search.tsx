import styles from './Search.module.css';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/helpers';
import { Search as SearchIcon } from 'lucide-react';
import classNames from 'classnames';

const Search = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<any>();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const runSearch = (searchValue: string) => {
    if (searchValue.length) {
      navigate(`/?search=${searchValue.toLowerCase()}`);
    }
  };

  const focusSearch = (event: KeyboardEvent) => {
    if (event.key === 'F2') {
      searchInputRef.current.focus();
    }
  };

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    runSearch(event.target.value);
    searchInputRef.current.value = '';
  }, []);

  const debouncedSearch = debounce(handleSearch, 1000);

  useEffect(() => {
    document.addEventListener('keydown', focusSearch);

    return () => {
      document.removeEventListener('keydown', focusSearch);
    };
  }, []);

  const handleFocused = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className={styles.searchWrapper}>
      <SearchIcon
        className={classNames(styles.searchIcon, {
          [styles.focused]: isInputFocused,
        })}
      />
      <input
        type="text"
        className={styles.input}
        placeholder="Search by title..."
        onChange={debouncedSearch}
        ref={searchInputRef}
        onFocus={handleFocused}
        onBlur={handleBlur}
      />
    </div>
  );
};

export { Search };

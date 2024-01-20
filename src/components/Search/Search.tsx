import classes from './Search.module.css';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/assets/icons';
import { debounce } from '@/helpers';

const Search = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<any>();

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

  return (
    <div className={classes.searchWrapper}>
      <input
        type="text"
        className={classes.input}
        placeholder="Search film..."
        onChange={debouncedSearch}
        ref={searchInputRef}
      />
      <SearchIcon color="#ddd" className={classes.searchIcon} />
    </div>
  );
};

export { Search };

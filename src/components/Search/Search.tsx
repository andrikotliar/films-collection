import classes from './Search.module.css';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/helpers';
import { Search as SearchIcon } from 'lucide-react';

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
        placeholder="Search by title..."
        onChange={debouncedSearch}
        ref={searchInputRef}
      />
      <SearchIcon className={classes.searchIcon} />
    </div>
  );
};

export { Search };

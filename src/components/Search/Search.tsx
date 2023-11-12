import classes from './Search.module.css';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/assets/icons';

const Search = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<any>();
  const [searchString, setSearchString] = useState('');

  const runSearch = (searchValue: string) => {
    if (searchValue.length) {
      navigate(`/?search=${searchValue.toLowerCase()}`);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(searchString);
    searchInputRef.current.value = '';
  };

  const focusSearch = (event: KeyboardEvent) => {
    if (event.key === 'F2') {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', focusSearch);

    return () => {
      document.removeEventListener('keydown', focusSearch);
    };
  }, []);

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <input
        type="text"
        className={classes.input}
        placeholder="Search film..."
        onChange={(e) => setSearchString(e.target.value)}
        ref={searchInputRef}
      />
      <button className={classes.button}>
        <SearchIcon color="#ddd" />
      </button>
    </form>
  );
};

export { Search };

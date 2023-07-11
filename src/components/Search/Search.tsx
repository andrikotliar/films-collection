import './search.css';
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SearchIcon } from '@/assets/icons';

type SearchProps = {
  isOpen: boolean;
  setIsSearchVisible: Dispatch<SetStateAction<boolean>>;
}

const Search: FC<SearchProps> = ({
  isOpen,
  setIsSearchVisible,
}) => {
  const navigate = useNavigate();
  const searchInputRef = useRef<any>();
  const [searchString, setSearchString] = useState('');

  const runSearch = (searchValue: string) => {
    navigate(`/?search=${searchValue.toLowerCase()}`);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(searchString);
    searchInputRef.current.value = '';
    if(isOpen) {
      setIsSearchVisible(false);
    }
  }

  const focusSearch = (event: KeyboardEvent) => {
    if(event.key === 'F2') {
      searchInputRef.current.focus();
    }
  }

  useEffect(() => {
    if(isOpen) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300)
    }
  }, [isOpen, searchInputRef])

  useEffect(() => {
    document.addEventListener('keydown', focusSearch);

    return () => {
      document.removeEventListener('keydown', focusSearch);
    }
  }, []);

  return (
    <form
      className={classNames('search-form', {
        'search-form--active': isOpen
      })}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search film..."
        onChange={(e) => setSearchString(e.target.value)}
        ref={searchInputRef}
      />
      <button className="search-button">
        <SearchIcon color="#ddd" />
      </button>
    </form>
  );
};

export default Search;

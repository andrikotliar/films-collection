import './style.css';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/assets/icons';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const Search = ({ isOpen }) => {
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const [searchString, setSearchString] = useState('');

  const runSearch = (searchValue) => {
    navigate(`/?search=${searchValue}`);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    runSearch(searchString);
    searchInputRef.current.value = '';
  }

  const focusSearch = (event) => {
    if(event.key === 'F2') {
      searchInputRef.current.focus();
    }
  }

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

import './style.css';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/assets/icons';
import { useEffect, useRef, useState } from 'react';
import MenuWrapper from '../MenuWrappper';

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

  useEffect(() => {
    if(isOpen) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <MenuWrapper isOpen={isOpen}>
      <form
        className="search-form"
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
    </MenuWrapper>
  );
};

export default Search;

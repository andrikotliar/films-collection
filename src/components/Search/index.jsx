import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { SearchIcon } from '@/assets/icons';
import './style.css';

const Search = ({
  openSearch,
  closeSearch,
}) => {
  const [ searchFilm, setSearchFilm ] = useState('');
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const runSearch = (searchValue) => {
    navigate(`/?search=${searchValue}`);
    closeSearch();
  }

  const keySearch = (event) => {
    if(event.keyCode === 13) {
      runSearch(event.target.value);
    }
  }

  useEffect(() => {
    if(openSearch) {
      searchInputRef.current.focus();
    }
  }, [openSearch])

  return (
    <Modal
      showModal={openSearch}
      closeModal={closeSearch}
    >
      <div className="search-field">
        <div className="search-field__wrapper">
          <input
            type="text"
            className="search-field__input"
            placeholder="Search film..."
            onChange={(e) => setSearchFilm(e.target.value)}
            onKeyDown={keySearch}
            ref={searchInputRef}
          />
          <button
            onClick={() => runSearch(searchFilm)}
            className="search-field__button"
          >
            <SearchIcon fill="#ddd" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Search;

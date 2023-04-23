import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from '@/assets/icons';
import './style.css';
import classNames from 'classnames';

const Search = ({ className, showSearch = true }) => {
  const [ searchFilm, setSearchFilm ] = useState('');
  const navigate = useNavigate();

  if(!showSearch) {
    return null;
  }

  const keySearch = (event) => {
    if(event.keyCode === 13) {
      navigate(`/?search=${event.target.value}`);
    }
  }

  return (
    <div className={classNames('search-field', className)}>
      <div className="search-field__wrapper">
        <input
          type="text"
          className="search-field__input"
          placeholder="Search film..."
          onChange={(e) => setSearchFilm(e.target.value)}
          onKeyDown={keySearch}
        />
        <Link to={`/?search=${searchFilm}`} className="search-field__button">
          <SearchIcon fill="#ddd" />
        </Link>
      </div>
    </div>
  );
};

export default Search;

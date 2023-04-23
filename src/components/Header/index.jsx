import { useState } from 'react';
import { CloseIcon, SearchIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Logo } from '@/assets/logos';
import Search from '@/components/Search';
import './styles.css';

const Header = () => {
  const [ isSearchShow, setIsSearchShow ] = useState(false);

  const showSearch = () => {
    setIsSearchShow((prevState) => !prevState);
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <Logo fill="#006db7" />
      </Link>
      <Search
        className="header__search"
        showSearch={isSearchShow}
        changeVisibility={setIsSearchShow}
      />
      <nav className="header__navigation">
        <button
          className="header__button header__search-button"
          onClick={showSearch}
          aria-label="Show search field"
          title="Search"
        >
          {isSearchShow ? <CloseIcon fill="#006db7" /> : <SearchIcon />}
        </button>
      </nav>
    </header>
  );
};

export default Header;

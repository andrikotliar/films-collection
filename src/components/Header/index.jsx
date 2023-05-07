import { useEffect, useState } from 'react';
import { MenuIcon, SearchIcon } from '@/assets/icons';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../Menu';
import Search from '../Search';
import './styles.css';
import classNames from 'classnames';

const Header = () => {
  const location = useLocation();
  const [ isSearchShow, setIsSearchShow ] = useState(false);
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  useEffect(() => {
    if(isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [location]);

  return (
    <header className="header">
      <button
        className="header__button"
        onClick={() => setIsSearchShow(true)}
        aria-label="Show search field"
        title="Search"
      >
        <SearchIcon />
      </button>
      <Link to="/" className="header__logo">
        <picture>
          <source srcSet="/images/logos/desktop-logo.svg" media="(min-width: 785px)" />
          <img src="/images/logos/mobile-logo.svg" alt="Films Collection" />
        </picture>
      </Link>
      <button
        className={classNames('header__button', {
          'header__button--active': isDropdownOpen
        })}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="Show menu dropdown"
        title="Menu"
      >
        <MenuIcon />
      </button>
      <Menu isOpen={isDropdownOpen} />
      <Search
        openSearch={isSearchShow}
        closeSearch={() => setIsSearchShow(false)}
      />
    </header>
  );
};

export default Header;

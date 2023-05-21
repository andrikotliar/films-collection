import { useEffect, useState } from 'react';
import { CloseIcon, MenuIcon, SearchIcon } from '@/assets/icons';
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
      <div className="header__container container">
        <button
          className="header__button"
          onClick={() => setIsSearchShow(!isSearchShow)}
          aria-label="Show search field"
          title="Search"
        >
          {!isSearchShow ? (
            <SearchIcon color="#fff" />
          ): (
            <CloseIcon color="#fff" />
          )}
        </button>
        <Search
          openSearch={isSearchShow}
          closeSearch={() => setIsSearchShow(false)}
        />
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
          <MenuIcon color="#fff" />
        </button>
        <Menu isOpen={isDropdownOpen} />
      </div>
    </header>
  );
};

export default Header;

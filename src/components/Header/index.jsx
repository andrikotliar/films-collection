import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FilterIcon, SearchIcon } from '@/assets/icons';
import FilmsCollectionLogo from '@/assets/logo/FilmsCollectionLogo';
import Search from '../Search';
import classNames from 'classnames';
import Menu from '../Menu';
import { useAppContext } from '@/context/appContext';

const Header = () => {
  const { pathname } = useLocation();
  const [ isSearchVisible, setIsSearchVisible ] = useState(false);
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  const { isFilterOpen, setIsFilterOpen } = useAppContext();

  useEffect(() => {
    if(isMenuVisible) {
      setIsMenuVisible(false);
    }
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <FilmsCollectionLogo />
        </Link>
        <div className="header__actions">
          <button
            className="header__button header__search-button"
            onClick={() => {
              setIsSearchVisible(!isSearchVisible);
              setIsFilterOpen(false);
              setIsMenuVisible(false);
            }}
          >
            <SearchIcon />
          </button>
          <button
            className="header__filter-button"
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSearchVisible(false);
              setIsMenuVisible(false);
            }}
          >
            <div className="header__button-icon">
              <FilterIcon />
            </div>
            <span>Filter</span>
          </button>
          <Search isOpen={isSearchVisible} />
          <button
            className={classNames('header__menu-button', {
              'header__menu-button--active': isMenuVisible
            })}
            onClick={() => {
              setIsMenuVisible(!isMenuVisible);
              setIsFilterOpen(false);
              setIsSearchVisible(false);
            }}
          >
            <span></span>
          </button>
        </div>
        <Menu isActive={isMenuVisible} />
      </div>
    </header>
  );
};

export default Header;

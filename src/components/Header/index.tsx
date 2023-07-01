import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloseIcon, HomeIcon, MenuIcon, SearchIcon } from '@/assets/icons';
import FilmsCollectionLogo from '@/assets/logo/FilmsCollectionLogo';
import Search from '../Search';
import classNames from 'classnames';
import Menu from '../Menu';
import { useAppContext } from '@/context/AppContext';

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
            className={classNames('header__button header__search-button', {
              'header__button--active': isSearchVisible
            })}
            onClick={() => {
              setIsSearchVisible(!isSearchVisible);
              setIsFilterOpen(false);
              setIsMenuVisible(false);
            }}
          >
            <SearchIcon />
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
            <MenuIcon />
          </button>
        </div>
        <Menu isActive={isMenuVisible} />
      </div>
    </header>
  );
};

export default Header;

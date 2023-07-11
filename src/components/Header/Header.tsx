import './header.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, SearchIcon } from '@/assets/icons';
import FilmsCollectionLogo from '@/assets/logo/FilmsCollectionLogo';
import Search from '../Search/Search';
import classNames from 'classnames';
import Menu from '../Menu/Menu';

const Header = () => {
  const { pathname } = useLocation();
  const [ isSearchVisible, setIsSearchVisible ] = useState(false);
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);

  useEffect(() => {
    if(isMenuVisible) {
      setIsMenuVisible(false);
    }
    if(isSearchVisible) {
      setIsSearchVisible(false)
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
              setIsMenuVisible(false);
            }}
          >
            <div className="header__search-icon">
              <SearchIcon color="#fff" />
            </div>
          </button>
          <Search
            isOpen={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
          <button
            className={classNames('header__button', {
              'header__button--active': isMenuVisible
            })}
            onClick={() => {
              setIsMenuVisible(!isMenuVisible);
              setIsSearchVisible(false);
            }}
          >
            <div className="header__menu-icon">
              <MenuIcon />
            </div>
          </button>
        </div>
        <Menu isActive={isMenuVisible} />
      </div>
    </header>
  );
};

export default Header;

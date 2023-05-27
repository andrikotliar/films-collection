import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, SearchIcon } from '@/assets/icons';
import FilmsCollectionLogo from '@/assets/logo/FilmsCollectionLogo';
import HeaderMenu from '../HeaderMenu';
import Search from '../Search';
import IconButton from '../IconButton';

const MenuTypesEnum = {
  NAVIGATION: 'navigation',
  SEARCH: 'search'
}

const Header = () => {
  const location = useLocation();
  const [ openedMenu, setOpenedMenu ] = useState(null);

  const showHiddenMenu = (menuType) => {
    if(openedMenu === menuType) {
      setOpenedMenu(null);
      return;
    }
    setOpenedMenu(menuType);
  }

  useEffect(() => {
    if(openedMenu !== null) {
      setOpenedMenu(null);
    }
  }, [location]);
  
  const handleKeyboard = (event) => {
    if(event.key === 'F2') {
      setOpenedMenu(MenuTypesEnum.SEARCH);
    }

    if(event.key === 'Escape') {
      setOpenedMenu(null);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
  }, []);

  return (
    <header className="header">
      <div className="header__container container">
        <IconButton
          active={openedMenu === MenuTypesEnum.SEARCH}
          onClick={() => showHiddenMenu(MenuTypesEnum.SEARCH)}
          title="Search"
        >
          <SearchIcon />
        </IconButton>
        <Link to="/" className="header__logo">
          <FilmsCollectionLogo />
        </Link>
        <IconButton
          active={openedMenu === MenuTypesEnum.NAVIGATION}
          onClick={() => showHiddenMenu(MenuTypesEnum.NAVIGATION)}
          title="Menu"
        >
          <MenuIcon />
        </IconButton>
      </div>
      <HeaderMenu isOpen={openedMenu === MenuTypesEnum.NAVIGATION} />
      <Search isOpen={openedMenu === MenuTypesEnum.SEARCH} />
    </header>
  );
};

export default Header;

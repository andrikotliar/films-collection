import classes from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/AppWrapper/components/Header/Logo';
import { Search } from '@/components/Search';
import { globalMenu } from '@/configs';
import { Menu } from 'lucide-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const checkIsActive = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  const handleOpenMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={classes.header}>
      <Link
        to={{
          pathname: '/',
          search: location.search,
        }}
        className={classes.logoWrapper}
      >
        <Logo className={classes.logo} />
      </Link>
      <Search />
      <button className={classes.menuButton} onClick={handleOpenMenu}>
        <Menu />
      </button>
      <div
        className={classNames(classes.navigation, {
          [classes.isOpen]: isMenuOpen,
        })}
      >
        <Navigation
          links={globalMenu}
          checkIsActive={checkIsActive}
          markerAlignment="left"
        />
      </div>
    </header>
  );
};

export { Header };

import styles from './header.module.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';
import { FilmsSearch } from '../films-search';
import { AppMenu } from '../app-menu/app-menu';
import { Logo } from '~/components/logo/logo';

export const Header = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);

  const location = useLocation();

  const handleToggleAppMenu = () => {
    setIsAppMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseAppMenu = () => {
    setIsAppMenuOpen(false);
  };

  useEffect(() => {
    handleCloseAppMenu();
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.leftColumn}>
          <Link
            to="/"
            search={location.pathname === '/' ? location.search : undefined}
            className={styles.logoWrapper}
          >
            <Logo />
          </Link>
        </div>
        <div className={styles.searchWrapper}>
          <FilmsSearch />
        </div>
        <button className={styles.menuButton} onClick={handleToggleAppMenu} ref={menuButtonRef}>
          <MenuIcon className={styles.menuIcon} />
        </button>
        <AppMenu
          isOpen={isAppMenuOpen}
          onClose={handleCloseAppMenu}
          menuButtonRef={menuButtonRef}
        />
      </div>
    </header>
  );
};

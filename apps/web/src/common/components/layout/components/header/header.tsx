import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';
import { FilmsSearch } from '../films-search/films-search';
import { AppMenu } from '../app-menu/app-menu';
import { Logo } from '~/common/components/logo/logo';

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
      <div className={styles.header_container}>
        <div className={styles.left_column}>
          <Link
            to="/"
            search={location.pathname === '/' ? location.search : undefined}
            className={styles.logo_wrapper}
          >
            <Logo />
          </Link>
        </div>
        <div className={styles.search_wrapper}>
          <FilmsSearch />
        </div>
        <button className={styles.menu_button} onClick={handleToggleAppMenu} ref={menuButtonRef}>
          <MenuIcon className={styles.menu_icon} />
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

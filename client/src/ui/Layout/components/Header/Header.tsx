import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';
import { Search } from '../Search/Search';
import styles from './Header.module.css';
import { AppMenu } from '../AppMenu/AppMenu';
import { Logo } from '@/ui/Logo/Logo';
import { useLogoDecoration } from '@/hooks';
import { LogoDecoration } from '../LogoDecoration/LogoDecoration';

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

  const logoDecoration = useLogoDecoration();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.leftColumn}>
          <Link
            to="/"
            search={location.pathname === '/' ? location.search : undefined}
            className={styles.logoWrapper}
          >
            <Logo className={styles.logo} />
          </Link>
          {logoDecoration !== null && (
            <LogoDecoration
              src={logoDecoration.image}
              title={logoDecoration.title}
              collectionId={logoDecoration.collectionId}
            />
          )}
        </div>
        <Search />
        <button
          className={styles.menuButton}
          onClick={handleToggleAppMenu}
          ref={menuButtonRef}
        >
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

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';
import { Search } from '../Search/Search';
import styles from './Header.module.css';
import { AppMenu } from '../AppMenu/AppMenu';
import { Logo } from '@/components/Logo/Logo';

const Header = () => {
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
        <Link
          to={{
            pathname: '/',
            search: location.pathname === '/' ? location.search : undefined,
          }}
          className={styles.logoWrapper}
        >
          <Logo className={styles.logo} />
        </Link>
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

export { Header };

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';
import { Search, Logo } from './components';
import { Container } from '../container/Container';
import styles from './Header.module.css';
import { AppMenu } from '../app-menu/AppMenu';

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
      <Container className={styles.headerContainer}>
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
      </Container>
    </header>
  );
};

export { Header };
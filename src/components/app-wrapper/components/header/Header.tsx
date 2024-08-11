import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { mainMenu } from '@/configs';
import { Search, Logo } from './components';
import styles from './Header.module.css';
import { MenuIcon } from 'lucide-react';
import { Menu } from '@/components/menu/Menu';
import { Container } from '../container/Container';

const Header = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    handleCloseMenu();
  }, [location]);

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
          onClick={handleOpenMenu}
          ref={menuButtonRef}
        >
          <MenuIcon className={styles.menuIcon} />
        </button>
      </Container>
    </header>
  );
};

export { Header };

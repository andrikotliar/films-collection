import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainMenu } from '@/configs';
import { MenuIcon } from 'lucide-react';
import { useClickOutside } from '@/hooks';
import { Container } from '../container/Container';
import { Menu, Search, Logo } from './components';

import styles from './Header.module.css';

const Header = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const checkActiveState = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  const handleOpenMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleCloseMenu);

    return () => {
      document.removeEventListener('scroll', handleCloseMenu);
    };
  }, []);

  useClickOutside({
    isOpen: isMenuOpen,
    closeHandler: handleCloseMenu,
    triggerElementRef: menuButtonRef,
    containerRef: menuRef,
  });

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <Link
          to={{
            pathname: '/',
            search: location.search,
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
        <Menu
          links={mainMenu}
          isOpen={isMenuOpen}
          checkActiveState={checkActiveState}
          ref={menuRef}
        />
      </Container>
    </header>
  );
};

export { Header };

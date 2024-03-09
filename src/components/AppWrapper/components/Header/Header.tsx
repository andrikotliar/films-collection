import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/AppWrapper/components/Header/Logo';
import { Search } from '@/components/Search';
import { mainMenu } from '@/configs';
import { MenuIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/Container';
import { Menu } from './components';
import { useClickOutsideMenu } from '@/components/AppWrapper/components/Header/hooks';

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

  useClickOutsideMenu({
    isOpen: isMenuOpen,
    closeHandler: handleCloseMenu,
    buttonRef: menuButtonRef,
    menuRef,
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

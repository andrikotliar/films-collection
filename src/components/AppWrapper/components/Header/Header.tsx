import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/AppWrapper/components/Header/Logo';
import { Search } from '@/components/Search';
import { globalMenu } from '@/configs';
import { Menu } from 'lucide-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Container } from '@/components/Container';

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
        <button className={styles.menuButton} onClick={handleOpenMenu}>
          <Menu />
        </button>
        <div
          className={classNames(styles.navigation, {
            [styles.isOpen]: isMenuOpen,
          })}
        >
          <Navigation
            links={globalMenu}
            checkIsActive={checkIsActive}
            markerAlignment="left"
          />
        </div>
      </Container>
    </header>
  );
};

export { Header };

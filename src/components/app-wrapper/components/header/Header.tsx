import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '@/components/icons/Icons';
import classNames from 'classnames';
import { mainMenu } from '@/configs';
import { PopupMenu } from '@/components/popup-menu/PopupMenu';
import { Container } from '../container/Container';
import { Search, Logo } from './components';
import styles from './Header.module.css';

const Header = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
          <Icons icon="menu" className={styles.menuIcon} />
        </button>
        <PopupMenu
          onClose={handleCloseMenu}
          triggerRef={menuButtonRef}
          isOpen={isMenuOpen}
          positionMarker="right"
        >
          <div className={styles.menuWrapper}>
            {mainMenu.map((item) => (
              <Link
                to={item.link}
                className={classNames(styles.menuLink, {
                  [styles.activeLink]: checkActiveState(item.link),
                })}
                key={item.link}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </PopupMenu>
      </Container>
    </header>
  );
};

export { Header };

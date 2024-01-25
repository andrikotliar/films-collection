import classes from './RootNavigation.module.css';
import { Scrollable } from '@/components/Scrollable';
import { Link, useLocation } from 'react-router-dom';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';
import { Navigation } from '@/components/Navigation';
import { globalMenu } from '@/configs';
import { Menu } from 'lucide-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const RootNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const checkIsActive = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <Scrollable className={classes.navigation}>
      <div className={classes.navigationHeader}>
        <Link
          to={{
            pathname: '/',
            search: location.search,
          }}
          className={classes.logoWrapper}
        >
          <FilmsCollectionLogo className={classes.logo} />
        </Link>
        <Search />
      </div>
      <div
        className={classNames(classes.menuWrapper, {
          [classes.isOpen]: isMenuOpen,
        })}
      >
        <Navigation links={globalMenu} checkIsActive={checkIsActive} />
      </div>
      <button
        className={classes.mobileMenuButton}
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu />
      </button>
    </Scrollable>
  );
};

export { RootNavigation };

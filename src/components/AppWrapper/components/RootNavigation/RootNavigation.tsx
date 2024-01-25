import classNames from 'classnames';
import classes from './RootNavigation.module.css';
import { Scrollable } from '@/components/Scrollable';
import { Link, useLocation } from 'react-router-dom';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';
import { Navigation } from '@/components/Navigation';
import { globalMenu } from '@/configs';

const RootNavigation = () => {
  const location = useLocation();

  const checkIsActive = (currentLink: string) => {
    return location.pathname === currentLink;
  };

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
      <Navigation links={globalMenu} checkIsActive={checkIsActive} />
    </Scrollable>
  );
};

export { RootNavigation };

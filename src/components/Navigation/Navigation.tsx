import classes from './Navigation.module.css';
import { FilmsCollectionLogo } from '@/assets/logos';
import { menu } from '@/components/Navigation/common/menu';
import { Scrollable } from '@/components/Scrollable';
import { Search } from '@/components/Search';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

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
      <ul className={classes.menu}>
        {menu.map((menuItem) => (
          <li className={classes.menuItem} key={menuItem.id}>
            <Link
              to={menuItem.link}
              className={classNames(classes.menuLink, {
                [classes.disabled]: menuItem.isDisabled,
                [classes.active]: location.pathname === menuItem.link,
              })}
            >
              {menuItem.icon}
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </Scrollable>
  );
};

export { Navigation };

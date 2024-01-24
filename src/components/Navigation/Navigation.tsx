import classes from './Navigation.module.css';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Scrollable } from '@/components/Scrollable';
import { Search } from '@/components/Search';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Link = {
  id: string;
  title: string;
  link: string;
  icon: ReactNode;
  isDisabled?: boolean;
  isPrivate?: boolean;
};

type Props = {
  links: Link[];
  checkIsActive: (currentLink: Link['link']) => boolean;
};

const Navigation: FC<Props> = ({ links, checkIsActive }) => {
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
        {links.map((menuItem) => (
          <li className={classes.menuItem} key={menuItem.id}>
            <Link
              to={menuItem.link}
              className={classNames(classes.menuLink, {
                [classes.disabled]: menuItem.isDisabled,
                [classes.active]: checkIsActive(menuItem.link),
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

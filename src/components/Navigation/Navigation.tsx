import { NavLink } from '@/common';
import classes from './Navigation.module.css';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  links: NavLink[];
  checkIsActive: (currentLink: NavLink['link']) => boolean;
};

const Navigation: FC<Props> = ({ links, checkIsActive }) => {
  return (
    <ul className={classes.navigation}>
      {links.map((menuItem) => (
        <li className={classes.navItem} key={menuItem.id}>
          <Link
            to={menuItem.link}
            className={classNames(classes.navLink, {
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
  );
};

export { Navigation };

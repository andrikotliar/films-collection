import { NavLink } from '@/common';
import classes from './Navigation.module.css';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  links: NavLink[];
  checkIsActive: (currentLink: NavLink['link']) => boolean;
  markerAlignment?: 'left' | 'right';
};

const markerAlignmentClassName = {
  left: classes.leftMarker,
  right: classes.rightMarker,
};

const Navigation: FC<Props> = ({
  links,
  checkIsActive,
  markerAlignment = 'right',
}) => {
  return (
    <ul className={classes.navigation}>
      {links.map((menuItem) => (
        <li className={classes.navItem} key={menuItem.id}>
          <Link
            to={menuItem.link}
            className={classNames(
              classes.navLink,
              markerAlignmentClassName[markerAlignment],
              {
                [classes.disabled]: menuItem.isDisabled,
                [classes.active]: checkIsActive(menuItem.link),
              },
            )}
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

import { NavLink } from '@/common';
import styles from './Navigation.module.css';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  links: NavLink[];
  checkIsActive: (currentLink: NavLink['link']) => boolean;
  markerAlignment?: 'left' | 'right';
};

const markerAlignmentClassName = {
  left: styles.leftMarker,
  right: styles.rightMarker,
};

const Navigation: FC<Props> = ({
  links,
  checkIsActive,
  markerAlignment = 'right',
}) => {
  return (
    <ul className={styles.navigation}>
      {links.map((menuItem) => (
        <li className={styles.navItem} key={menuItem.id}>
          <Link
            to={menuItem.link}
            className={classNames(
              styles.navLink,
              markerAlignmentClassName[markerAlignment],
              {
                [styles.disabled]: menuItem.isDisabled,
                [styles.active]: checkIsActive(menuItem.link),
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

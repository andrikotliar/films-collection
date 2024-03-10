import { NavLink } from '@/common';
import { Link } from 'react-router-dom';

import styles from './Menu.module.css';
import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = {
  links: NavLink[];
  isOpen: boolean;
  checkActiveState(currentLink: string): boolean;
};

const Menu = forwardRef<HTMLDivElement, Props>(
  ({ links, isOpen, checkActiveState }, ref) => {
    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.menu} ref={ref}>
        {links.map((item) => (
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
    );
  },
);

export { Menu };

import styles from './console-menu.module.css';
import { consoleMenuConfig, defineCssProperties } from '~/shared';
import { Link, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
import { HomeIcon } from 'lucide-react';

const menuItems = Object.values(consoleMenuConfig).filter((item) => !item.search);

export const ConsoleMenu = () => {
  const location = useLocation();

  return (
    <div className={styles.console_menu}>
      <Link to="/" className={clsx(styles.console_link, styles.home_link)}>
        <HomeIcon />
      </Link>
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.route}
          className={clsx(
            styles.console_link,
            item.route === location.pathname && styles.console_link_active,
          )}
          style={defineCssProperties({
            '--console-float-menu-color': `var(--${item.color})`,
          })}
          search={item.search}
        >
          <div className={styles.icon}>{item.icon}</div>
          <div className={styles.link_title}>{item.shortTitle ?? item.title}</div>
        </Link>
      ))}
    </div>
  );
};

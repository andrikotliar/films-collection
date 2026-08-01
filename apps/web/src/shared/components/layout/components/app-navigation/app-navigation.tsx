import styles from './app-navigation.module.css';
import { Link, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
import {
  HomeIcon,
  InfoIcon,
  SearchIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import type { FileRoutesByTo } from '~/routeTree.gen';
import { Button } from '~/shared/components/button/button';
import { FilmsSearch } from '~/shared/components/layout/components/films-search/films-search';
import { Logo } from '~/shared/components/logo/logo';
import { Modal } from '~/shared/components/modal/modal';
import { useFilterContext } from '~/shared/hooks';
import type { NavLink } from '~/shared/types';

const navigationConfig: NavLink[] = [
  {
    id: 'home',
    icon: <HomeIcon className={styles.navigation_item_icon} />,
    title: 'Home',
    path: '/',
  },
  {
    id: 'about',
    icon: <InfoIcon className={styles.navigation_item_icon} />,
    title: 'About',
    path: '/about',
  },
];

const pagesWithFilter = ['/', '/console/films'];

export const AppNavigation = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { openFilter } = useFilterContext();

  return (
    <div className={styles.app_navigation_layout}>
      <div className={styles.inner}>
        <div className={styles.desktop_logo}>
          <Logo size={40} />
        </div>
        {navigationConfig.map((link) => (
          <Link
            to={link.path}
            key={link.id}
            className={clsx(
              styles.navigation_item,
              location.pathname === link.path && styles.navigation_item_active,
            )}
          >
            {link.icon}
            <span className={styles.navigation_item_title}>{link.title}</span>
          </Link>
        ))}
        {pagesWithFilter.includes(location.pathname) && (
          <button
            className={clsx(styles.navigation_item, styles.filter_button)}
            onClick={() => openFilter(location.pathname as keyof FileRoutesByTo)}
          >
            <SlidersHorizontalIcon className={styles.navigation_item_icon} />
          </button>
        )}
        <button className={styles.navigation_item} onClick={() => setIsSearchOpen(true)}>
          <SearchIcon className={styles.navigation_item_icon} />
          <span className={styles.navigation_item_title}>Search</span>
        </button>
        <Link
          to="/console"
          className={clsx(
            styles.navigation_item,
            styles.console_link,
            location.pathname.includes('/console') && styles.navigation_item_active,
          )}
        >
          <SettingsIcon className={styles.navigation_item_icon} />
          <span className={styles.navigation_item_title}>Console</span>
        </Link>
      </div>
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        isAllowedClickOutside={false}
      >
        <FilmsSearch onClose={() => setIsSearchOpen(false)} />
        <div className={styles.close_modal_button}>
          <Button
            icon={<XIcon />}
            variant="ghost"
            inheritColor
            size="large"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

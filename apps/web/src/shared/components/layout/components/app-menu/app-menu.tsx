import { IconLink } from '~/shared/components/icon-link/icon-link';
import styles from './app-menu.module.css';
import { useLocation } from '@tanstack/react-router';
import { HomeIcon, InfoIcon } from 'lucide-react';

export const AppMenu = () => {
  const location = useLocation();
  return (
    <div className={styles.menu_wrapper}>
      {location.pathname === '/' ? (
        <IconLink icon={<InfoIcon />} to="/about" />
      ) : (
        <IconLink icon={<HomeIcon />} to="/" />
      )}
    </div>
  );
};

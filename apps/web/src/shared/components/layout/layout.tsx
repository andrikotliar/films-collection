import { Outlet } from '@tanstack/react-router';
import { Header } from './components';

import styles from './styles.module.css';

export const Layout = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
};

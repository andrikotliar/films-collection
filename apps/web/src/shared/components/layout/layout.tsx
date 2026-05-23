import { HeadContent, Outlet } from '@tanstack/react-router';
import { Header } from './components';

import styles from './layout.module.css';

export const Layout = () => {
  return (
    <>
      <HeadContent />
      <div className={styles.app}>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

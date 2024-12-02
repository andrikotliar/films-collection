import { Outlet } from '@tanstack/react-router';
import { Header } from './components';

import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
};

export { Layout };

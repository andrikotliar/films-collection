import { Outlet } from 'react-router-dom';
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

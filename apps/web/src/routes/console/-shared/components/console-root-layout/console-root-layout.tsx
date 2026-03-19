import styles from './console-root-layout.module.css';
import { ConsoleHeader } from './components';
import { Outlet } from '@tanstack/react-router';

export const ConsoleRootLayout = () => {
  return (
    <div className={styles.console_layout}>
      <ConsoleHeader />
      <Outlet />
    </div>
  );
};

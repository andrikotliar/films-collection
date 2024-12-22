import { useState } from 'react';
import { ConsoleHeader, ConsoleMenu } from './components';
import styles from './ConsoleLayout.module.css';
import { Outlet } from '@tanstack/react-router';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/constants';

export const ConsoleLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (document.documentElement.clientWidth <= MOBILE_VIEW_BREAKPOINT_PX) {
      return false;
    }

    return true;
  });

  const handleMenuOpen = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  return (
    <div className={styles.consoleLayout}>
      <ConsoleMenu isMenuOpen={isMenuOpen} />
      <div className={styles.consolePage}>
        <ConsoleHeader isMenuOpen={isMenuOpen} onMenuOpen={handleMenuOpen} />
        <div className={styles.consoleWorkingArea}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

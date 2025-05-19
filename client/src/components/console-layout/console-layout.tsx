import { useState } from 'react';
import { ConsoleHeader, ConsoleMenu } from './components';
import styles from './console-layout.module.css';
import { Outlet } from '@tanstack/react-router';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/constants';
import { LocalStorage } from '@/services';

export const ConsoleLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (document.documentElement.clientWidth <= MOBILE_VIEW_BREAKPOINT_PX) {
      return false;
    }

    const isConsoleMenuOpen = LocalStorage.getItem<boolean>(
      'IS_CONSOLE_MENU_OPEN',
    );

    return isConsoleMenuOpen ?? true;
  });

  const handleMenuOpen = () => {
    const isConsoleMenuOpen =
      LocalStorage.getItem<boolean>('IS_CONSOLE_MENU_OPEN') ?? true;

    LocalStorage.setItem('IS_CONSOLE_MENU_OPEN', !isConsoleMenuOpen);

    setIsMenuOpen((isOpen) => !isOpen);
  };

  return (
    <div className={styles.consoleLayout}>
      <ConsoleHeader isMenuOpen={isMenuOpen} onMenuOpen={handleMenuOpen} />
      <div className={styles.consolePage}>
        <ConsoleMenu isMenuOpen={isMenuOpen} />
        <div className={styles.consoleWorkingArea}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

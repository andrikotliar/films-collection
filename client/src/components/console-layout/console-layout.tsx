import styles from './console-layout.module.css';
import { useState } from 'react';
import { ConsoleHeader, ConsoleMenu } from './components';
import { Outlet } from '@tanstack/react-router';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/constants';
import { LocalStorage } from '@/services';

export const ConsoleLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (document.documentElement.clientWidth <= MOBILE_VIEW_BREAKPOINT_PX) {
      return false;
    }

    const isConsoleMenuOpen = LocalStorage.getItem<boolean>(
      'state:is_console_menu_open',
    );

    return isConsoleMenuOpen ?? true;
  });

  const handleMenuOpen = () => {
    const isConsoleMenuOpen =
      LocalStorage.getItem<boolean>('state:is_console_menu_open') ?? true;

    LocalStorage.setItem('state:is_console_menu_open', !isConsoleMenuOpen);

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

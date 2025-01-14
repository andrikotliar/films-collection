import { useState } from 'react';
import { ConsoleHeader, ConsoleMenu } from './components';
import styles from './ConsoleLayout.module.css';
import { Outlet } from '@tanstack/react-router';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/constants';
import { ConsoleMenuState, LocalStorageKey } from '@/enums';

export const ConsoleLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (document.documentElement.clientWidth <= MOBILE_VIEW_BREAKPOINT_PX) {
      return false;
    }

    const consoleMenuState = localStorage.getItem(
      LocalStorageKey.CONSOLE_MENU_STATE,
    );

    if (consoleMenuState) {
      return consoleMenuState === ConsoleMenuState.OPEN;
    }

    return true;
  });

  const handleMenuOpen = () => {
    const consoleMenuState =
      localStorage.getItem(LocalStorageKey.CONSOLE_MENU_STATE) ?? 'open';

    const nextConsoleMenuState =
      consoleMenuState === ConsoleMenuState.OPEN
        ? ConsoleMenuState.CLOSED
        : ConsoleMenuState.OPEN;

    localStorage.setItem(
      LocalStorageKey.CONSOLE_MENU_STATE,
      nextConsoleMenuState,
    );

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

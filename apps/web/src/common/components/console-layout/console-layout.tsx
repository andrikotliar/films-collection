import styles from './styles.module.css';
import { useMemo, useRef, useState } from 'react';
import { ConsoleHeader, ConsoleMenu } from './components';
import { Outlet } from '@tanstack/react-router';
import {
  LocalStorage,
  MOBILE_VIEW_BREAKPOINT_PX,
  useClickOutside,
  useCloseOnScroll,
} from '~/common';

export const ConsoleLayout = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMemo(() => {
    return document.documentElement.clientWidth <= MOBILE_VIEW_BREAKPOINT_PX;
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (isMobile) {
      return false;
    }

    const isConsoleMenuOpen = LocalStorage.getItem<boolean>('is_console_menu_open');

    return isConsoleMenuOpen ?? true;
  });

  const handleMenuOpen = () => {
    const isConsoleMenuOpen = LocalStorage.getItem<boolean>('is_console_menu_open') ?? true;

    LocalStorage.setItem('is_console_menu_open', !isConsoleMenuOpen);

    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useCloseOnScroll(handleCloseMenu, isMobile);

  useClickOutside({
    triggerElementRef: menuButtonRef,
    isOpen: isMenuOpen,
    containerRef: menuContainerRef,
    closeHandler: handleCloseMenu,
    isEnabled: isMobile,
  });

  return (
    <div className={styles.console_layout}>
      <ConsoleHeader
        isMenuOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        buttonRef={menuButtonRef}
      />
      <div className={styles.console_page}>
        <ConsoleMenu isMenuOpen={isMenuOpen} ref={menuContainerRef} />
        <div className={styles.console_working_area}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

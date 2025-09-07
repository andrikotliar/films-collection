import styles from './console-layout.module.css';
import { useMemo, useRef, useState } from 'react';
import { ConsoleHeader, ConsoleMenu } from './components';
import { Outlet } from '@tanstack/react-router';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/common';
import { LocalStorage } from '@/services';
import { useClickOutside, useCloseOnScroll } from '@/hooks';

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
    <div className={styles.consoleLayout}>
      <ConsoleHeader
        isMenuOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        buttonRef={menuButtonRef}
      />
      <div className={styles.consolePage}>
        <ConsoleMenu isMenuOpen={isMenuOpen} ref={menuContainerRef} />
        <div className={styles.consoleWorkingArea}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

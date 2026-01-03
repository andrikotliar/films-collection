import styles from './console-header.module.css';
import { LayoutGridIcon, LogOutIcon } from 'lucide-react';
import clsx from 'clsx';
import { Button, consoleMenuConfig, PopupMenu, useLogout } from '~/shared';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';

export const ConsoleHeader = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.console_header}>
      <Button
        icon={
          <LayoutGridIcon
            className={clsx(styles.menu_icon, {
              [styles.menu_icon_collapsed]: !isMenuOpen,
            })}
            size={20}
          />
        }
        variant="ghost"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        ref={buttonRef}
      />
      <div className={styles.console_header_title}>Films Collection Console</div>
      <button className={styles.logout_button} onClick={() => mutate({})}>
        <LogOutIcon size={18} />
      </button>
      <PopupMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={buttonRef}
        menuMargin={20}
      >
        <div className={styles.console_menu}>
          {consoleMenuConfig.map((item) => (
            <Link key={item.id} to={item.route} className={styles.console_link}>
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </PopupMenu>
    </div>
  );
};

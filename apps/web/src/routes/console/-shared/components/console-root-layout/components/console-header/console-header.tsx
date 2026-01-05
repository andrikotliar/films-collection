import styles from './console-header.module.css';
import { LayoutGridIcon, LogOutIcon } from 'lucide-react';
import clsx from 'clsx';
import {
  api,
  Button,
  consoleMenuConfig,
  defineCssProperties,
  LocalStorage,
  PopupMenu,
} from '~/shared';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

export const ConsoleHeader = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: api.auth.logout.create,
    onSuccess: () => {
      LocalStorage.removeItem('authenticated');
      navigate({ to: '/login' });
    },
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.console_header}>
      {location.pathname !== '/console' && (
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
      )}
      <div className={styles.console_header_title}>Films Collection Console</div>
      <button className={styles.logout_button} onClick={() => logout({})}>
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
            <Link
              key={item.id}
              to={item.route}
              className={styles.console_link}
              style={defineCssProperties({
                '--console-float-menu-color': `var(--${item.color})`,
              })}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </PopupMenu>
    </div>
  );
};

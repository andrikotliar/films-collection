import styles from './console-header.module.css';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import { AuthenticationApi } from '@/api';
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from '@/services';
import { type RefObject } from 'react';

type ConsoleHeaderProps = {
  isMenuOpen: boolean;
  onMenuOpen: VoidFunction;
  buttonRef: RefObject<HTMLButtonElement>;
};

export const ConsoleHeader = ({ onMenuOpen, isMenuOpen, buttonRef }: ConsoleHeaderProps) => {
  const navigate = useNavigate();

  const { mutateAsync: logout } = useMutation({
    mutationFn: AuthenticationApi.logout,
    onSuccess: () => {
      LocalStorage.removeItem('state:is_authenticated');
      navigate({ to: '/login' });
    },
  });

  return (
    <div className={styles.consoleHeader}>
      <button className={styles.menuButton} onClick={onMenuOpen} ref={buttonRef}>
        <MenuIcon
          className={classNames(styles.menuIcon, {
            [styles.menuIconCollapsed]: !isMenuOpen,
          })}
          size={20}
        />
      </button>
      <div className={styles.consoleHeaderTitle}>Films Collection Console</div>
      <button className={styles.logoutButton} onClick={() => logout()}>
        <LogOutIcon size={18} />
      </button>
    </div>
  );
};

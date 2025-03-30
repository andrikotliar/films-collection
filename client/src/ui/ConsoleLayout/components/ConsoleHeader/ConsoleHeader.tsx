import { FC } from 'react';
import styles from './ConsoleHeader.module.css';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import { AuthenticationApi } from '@/api';
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from '@/services';

type ConsoleHeaderProps = {
  isMenuOpen: boolean;
  onMenuOpen: VoidFunction;
};

export const ConsoleHeader: FC<ConsoleHeaderProps> = ({
  onMenuOpen,
  isMenuOpen,
}) => {
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: AuthenticationApi.logout,
  });

  const handleLogout = () => {
    logout();
    LocalStorage.removeItem('IS_AUTHENTICATED');
    navigate({ to: '/login' });
  };

  return (
    <div className={styles.consoleHeader}>
      <button className={styles.menuButton} onClick={onMenuOpen}>
        <MenuIcon
          className={classNames(styles.menuIcon, {
            [styles.menuIconCollapsed]: !isMenuOpen,
          })}
          size={20}
        />
      </button>
      <div className={styles.consoleHeaderTitle}>Films Collection Console</div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <LogOutIcon size={18} />
      </button>
    </div>
  );
};

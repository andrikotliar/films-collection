import styles from './console-header.module.css';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { type RefObject } from 'react';
import { useLogout } from '@/hooks';

type ConsoleHeaderProps = {
  isMenuOpen: boolean;
  onMenuOpen: VoidFunction;
  buttonRef: RefObject<HTMLButtonElement>;
};

export const ConsoleHeader = ({ onMenuOpen, isMenuOpen, buttonRef }: ConsoleHeaderProps) => {
  const { mutate } = useLogout();

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
      <button className={styles.logoutButton} onClick={() => mutate()}>
        <LogOutIcon size={18} />
      </button>
    </div>
  );
};

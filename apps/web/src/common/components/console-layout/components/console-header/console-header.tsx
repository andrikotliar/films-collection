import styles from './styles.module.css';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import clsx from 'clsx';
import { type RefObject } from 'react';
import { useLogout } from '~/common';

type Props = {
  isMenuOpen: boolean;
  onMenuOpen: VoidFunction;
  buttonRef: RefObject<HTMLButtonElement>;
};

export const ConsoleHeader = ({ onMenuOpen, isMenuOpen, buttonRef }: Props) => {
  const { mutate } = useLogout();

  return (
    <div className={styles.console_header}>
      <button className={styles.menu_button} onClick={onMenuOpen} ref={buttonRef}>
        <MenuIcon
          className={clsx(styles.menu_icon, {
            [styles.menu_icon_collapsed]: !isMenuOpen,
          })}
          size={20}
        />
      </button>
      <div className={styles.console_header_title}>Films Collection Console</div>
      <button className={styles.logout_button} onClick={() => mutate()}>
        <LogOutIcon size={18} />
      </button>
    </div>
  );
};

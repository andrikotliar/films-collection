import styles from './styles.module.css';
import { consoleMenuConfig } from '~/common';
import { Menu } from '~/common/components/menu/menu';
import clsx from 'clsx';
import { forwardRef } from 'react';

type Props = {
  isMenuOpen: boolean;
};

export const ConsoleMenu = forwardRef<HTMLDivElement, Props>(({ isMenuOpen }, ref) => {
  return (
    <div
      className={clsx(styles.menu_wrapper, {
        [styles.menu_wrapper_hidden]: !isMenuOpen,
      })}
      ref={ref}
    >
      <Menu config={consoleMenuConfig} className={styles.console_menu} />
    </div>
  );
});

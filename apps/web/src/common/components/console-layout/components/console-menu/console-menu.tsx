import styles from './styles.module.css';
import { consoleMenuConfig } from '~/common';
import { Menu } from '~/common/components/menu/menu';
import classNames from 'classnames';
import { forwardRef } from 'react';

type ConsoleMenuProps = {
  isMenuOpen: boolean;
};

export const ConsoleMenu = forwardRef<HTMLDivElement, ConsoleMenuProps>(({ isMenuOpen }, ref) => {
  return (
    <div
      className={classNames(styles.menuWrapper, {
        [styles.menuWrapperHidden]: !isMenuOpen,
      })}
      ref={ref}
    >
      <Menu config={consoleMenuConfig} className={styles.consoleMenu} />
    </div>
  );
});

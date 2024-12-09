import { Menu } from '@/components/Menu/Menu';
import styles from './ConsoleMenu.module.css';
import { consoleMenuConfig } from '@/configs';
import { FC } from 'react';
import classNames from 'classnames';

type ConsoleMenuProps = {
  isMenuOpen: boolean;
};

export const ConsoleMenu: FC<ConsoleMenuProps> = ({ isMenuOpen }) => {
  return (
    <div
      className={classNames(styles.menuWrapper, {
        [styles.menuWrapperHidden]: !isMenuOpen,
      })}
    >
      <Menu config={consoleMenuConfig} className={styles.consoleMenu} />
    </div>
  );
};

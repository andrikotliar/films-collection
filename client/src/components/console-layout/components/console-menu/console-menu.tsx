import styles from './console-menu.module.css';
import { consoleMenuConfig } from '@/configs';
import { Menu } from '@/components/menu/menu';
import classNames from 'classnames';

type ConsoleMenuProps = {
  isMenuOpen: boolean;
};

export const ConsoleMenu = ({ isMenuOpen }: ConsoleMenuProps) => {
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

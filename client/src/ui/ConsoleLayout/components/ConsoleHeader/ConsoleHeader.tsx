import { FC } from 'react';
import styles from './ConsoleHeader.module.css';
import { ChevronLeftIcon, LayoutGridIcon } from 'lucide-react';
import classNames from 'classnames';

type ConsoleHeaderProps = {
  isMenuOpen: boolean;
  onMenuOpen: VoidFunction;
};

export const ConsoleHeader: FC<ConsoleHeaderProps> = ({
  onMenuOpen,
  isMenuOpen,
}) => {
  return (
    <div className={styles.consoleHeader}>
      <button className={styles.menuButton} onClick={onMenuOpen}>
        <LayoutGridIcon
          className={classNames(styles.menuIcon, {
            [styles.menuIconCollapsed]: !isMenuOpen,
          })}
          size={20}
        />
      </button>
      <div className={styles.consoleHeaderTitle}>Films Collection Console</div>
    </div>
  );
};

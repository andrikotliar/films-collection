import styles from './styles.module.css';
import { type ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  onClick: VoidFunction;
  icon: ReactNode;
  isActive?: boolean;
};

export const ToolButton = ({ icon, onClick, isActive = false }: Props) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
};

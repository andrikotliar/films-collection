import styles from './tool-button.module.css';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';

type ToolButtonProps = {
  onClick: VoidFunction;
  icon: ReactNode;
  isActive?: boolean;
};

export const ToolButton: FC<ToolButtonProps> = ({
  icon,
  onClick,
  isActive = false,
}) => {
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

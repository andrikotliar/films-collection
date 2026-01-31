import styles from './tool-button.module.css';

import clsx from 'clsx';

type ToolButtonProps = {
  onClick: VoidFunction;
  icon: React.ReactNode;
  isActive?: boolean;
};

export const ToolButton = ({ icon, onClick, isActive = false }: ToolButtonProps) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
};

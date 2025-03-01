import styles from './Button.module.css';
import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  isHidden?: boolean;
  isActive?: boolean;
  variant?: ButtonVariant;
  activeClassName?: string;
  isDisabled?: boolean;
  className?: string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  variant = 'primary',
  isActive = false,
  activeClassName = styles.active,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(styles.button, styles[variant], className, {
        [styles.hidden]: isHidden,
        [activeClassName]: isActive,
      })}
      disabled={isDisabled}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  );
};

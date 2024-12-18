import styles from './Button.module.css';
import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types';

export type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  isHidden?: boolean;
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  activeClassName?: string;
  disabled?: boolean;
};

export const Button: FC<PropsWithChildren<PropsWithClassName<ButtonProps>>> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  variant = 'primary',
  isActive = false,
  activeClassName = styles.active,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(styles.button, styles[variant], className, {
        [styles.hidden]: isHidden,
        [activeClassName]: isActive,
      })}
      disabled={disabled}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  );
};

import classes from './Button.module.css';
import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '@/common';

type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  isHidden?: boolean;
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  activeClassName?: string;
  disabled?: boolean;
};

const Button: FC<PropsWithChildren<PropsWithClassName<ButtonProps>>> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  variant = 'primary',
  isActive = false,
  activeClassName = classes.active,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(classes.button, classes[variant], className, {
        [classes.hidden]: isHidden,
        [activeClassName]: isActive,
      })}
      disabled={disabled}
    >
      {icon && <div className={classes.icon}>{icon}</div>}
      {children}
    </button>
  );
};

export { Button };

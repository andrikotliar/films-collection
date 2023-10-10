import classes from './Button.module.css';
import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types';

type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  isHidden?: boolean;
  isActive?: boolean;
  design?: 'primary' | 'secondary' | 'ghost';
  activeClassName?: string;
};

const Button: FC<
  PropsWithChildren<PropsWithClassName<ButtonProps>>
> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  design = 'primary',
  isActive = false,
  activeClassName = classes.active,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        classes.button,
        classes[design],
        className,
        {
          [classes.hidden]: isHidden,
          [activeClassName]: isActive,
        },
      )}
    >
      {icon && <div className={classes.icon}>{icon}</div>}
      {children}
    </button>
  );
};

export { Button };

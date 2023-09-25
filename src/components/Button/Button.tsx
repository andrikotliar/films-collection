import './button.css';
import { FC, PropsWithChildren, ReactNode } from "react";
import classNames from 'classnames';

type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  className?: string;
  isHidden?: boolean;
  isActive?: boolean;
  design?: 'primary' | 'secondary' | 'ghost';
  activeClassName?: string;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  design = 'primary',
  isActive = false,
  activeClassName = 'button-active',
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames('button', `button-${design}`, className, {
        'button-hidden': isHidden,
        [activeClassName]: isActive
      })}
    >
      {icon && (
        <div className="button-icon">
          {icon}
        </div>
      )}
      {children}
    </button>
  );
};

export { Button };
import classNames from 'classnames';
import './styles.css';
import { FC, PropsWithChildren, ReactNode } from "react";

type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  className?: string;
  isHidden?: boolean;
  isActive?: boolean;
  design?: 'primary' | 'secondary' | 'empty'
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  design = 'primary',
  isActive = false
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames('button', `button-${design}`, className, {
        'button-hidden': isHidden,
        'button-active': isActive
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

export default Button;
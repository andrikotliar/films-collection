import styles from './button.module.css';
import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import { Loader } from '@/components/loader/loader';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = {
  onClick?: VoidFunction;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  isHidden?: boolean;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  className?: string;
  isLoading?: boolean;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  icon,
  onClick,
  className,
  type = 'button',
  isHidden = false,
  variant = 'primary',
  isDisabled,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(styles.button, styles[variant], className, {
        [styles.hidden]: isHidden,
      })}
      disabled={isDisabled || isLoading}
    >
      {isLoading && (
        <div className={styles.icon}>
          <Loader size={20} shouldInheritColor />
        </div>
      )}
      {icon && !isLoading && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  );
};

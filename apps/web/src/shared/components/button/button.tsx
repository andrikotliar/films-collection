import styles from './button.module.css';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { Loader } from '~/shared/components/loader/loader';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'light';

export type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  size?: 'small' | 'medium';
  fitWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      onClick,
      type = 'button',
      variant = 'primary',
      isDisabled,
      isLoading = false,
      size = 'medium',
      fitWidth = false,
    },
    ref,
  ) => {
    return (
      <button
        onClick={onClick}
        type={type}
        className={clsx(styles.button, styles[variant], styles[size], fitWidth && styles.fit_width)}
        disabled={isDisabled || isLoading}
        ref={ref}
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
  },
);

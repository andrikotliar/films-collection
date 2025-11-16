import styles from './styles.module.css';
import { type MouseEventHandler, type PropsWithChildren, type ReactNode } from 'react';
import clsx from 'clsx';
import { Loader } from '~/shared/components/loader/loader';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'light';

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const Button = ({
  children,
  icon,
  onClick,
  type = 'button',
  variant = 'primary',
  isDisabled,
  isLoading = false,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(styles.button, styles[variant])}
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

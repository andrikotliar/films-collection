import styles from './TextInput.module.css';
import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { ReactNode } from '@tanstack/react-router';

export type TextInputProps = {
  type?: 'text' | 'number' | 'password';
  label?: string;
  error?: string | string[];
  icon?: ReactNode;
  visiblePlaceholder?: boolean;
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      type = 'text',
      className,
      error,
      icon,
      visiblePlaceholder,
      ...props
    },
    ref,
  ) => {
    return (
      <label className={classNames(styles.inputWrapper, className)}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.fieldWrapper}>
          <input
            ref={ref}
            type={type}
            className={classNames(styles.textInput, {
              [styles.withIcon]: icon !== undefined,
              [styles.withVisiblePlaceholder]: visiblePlaceholder,
            })}
            {...props}
          />
          {icon}
        </div>
        <FieldError error={error} />
      </label>
    );
  },
);

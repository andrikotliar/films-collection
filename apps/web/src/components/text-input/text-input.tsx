import styles from './text-input.module.css';
import classNames from 'classnames';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';
import { FieldError } from '../field-error/field-error';
import { FieldLabel } from '../field-label/field-label';
import { type FormError } from '@/common';

export type TextInputProps = {
  type?: 'text' | 'number' | 'password';
  label?: string;
  error?: FormError;
  icon?: ReactNode;
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, type = 'text', className, error, icon, ...props }, ref) => {
    return (
      <label className={classNames(styles.inputWrapper, className)}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.fieldWrapper}>
          <input
            ref={ref}
            type={type}
            className={classNames(styles.textInput, {
              [styles.withIcon]: icon !== undefined,
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

import styles from './text-input.module.css';
import clsx from 'clsx';
import { type ComponentProps, forwardRef } from 'react';
import { FieldError } from '../field-error/field-error';
import { FieldLabel } from '../field-label/field-label';
import { type FormError } from '~/shared';

export type TextInputProps = {
  type?: 'text' | 'number' | 'password';
  label?: string;
  error?: FormError;
  icon?: React.ReactNode;
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, type = 'text', className, error, icon, ...props }, ref) => {
    return (
      <label className={clsx(styles.input_wrapper, className)}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.field_wrapper}>
          <input
            ref={ref}
            type={type}
            className={clsx(styles.text_input, {
              [styles.with_icon]: icon !== undefined,
            })}
            {...props}
          />
          <div className={styles.icon_wrapper}>{icon}</div>
        </div>
        <FieldError error={error} />
      </label>
    );
  },
);

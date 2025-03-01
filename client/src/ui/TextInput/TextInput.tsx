import styles from './styles.module.css';
import classNames from 'classnames';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';

export type TextInputProps = {
  type?: 'text' | 'number';
  label?: string;
  error?: string | string[] | null;
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
              [styles.withInput]: icon !== undefined,
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

import styles from './styles.module.css';
import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';

export type TextInputProps = {
  type?: 'text' | 'number';
  label?: string;
  error?: string | string[];
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, type = 'text', className, error, ...props }, ref) => {
    return (
      <label className={classNames(styles.inputWrapper, className)}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <input ref={ref} type={type} className={styles.textInput} {...props} />
        <FieldError error={error} />
      </label>
    );
  },
);

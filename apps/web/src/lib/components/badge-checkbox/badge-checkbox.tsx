import { type ComponentProps, forwardRef } from 'react';
import styles from './styles.module.css';
import { FieldError } from '../field-error/field-error';

type Props = {
  label: string;
  type?: 'radio' | 'checkbox';
  error?: string | string[];
} & Omit<ComponentProps<'input'>, 'type'>;

export const BadgeCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, type, error, ...inputProps }, ref) => {
    return (
      <label>
        <input type={type} ref={ref} className={styles.radio_button} {...inputProps} />
        <span className={styles.label}>{label}</span>
        <FieldError error={error} />
      </label>
    );
  },
);

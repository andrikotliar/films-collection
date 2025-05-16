import { ComponentProps, forwardRef } from 'react';
import styles from './BadgeCheckbox.module.css';
import { FieldError } from '../FieldError/FieldError';

type BadgeCheckboxProps = {
  label: string;
  type?: 'radio' | 'checkbox';
  error?: string | string[];
} & Omit<ComponentProps<'input'>, 'type'>;

export const BadgeCheckbox = forwardRef<HTMLInputElement, BadgeCheckboxProps>(
  ({ label, type, error, ...inputProps }, ref) => {
    return (
      <label>
        <input
          type={type}
          ref={ref}
          className={styles.radioButton}
          {...inputProps}
        />
        <span className={styles.label}>{label}</span>
        <FieldError error={error} />
      </label>
    );
  },
);

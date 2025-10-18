import { ComponentProps, forwardRef } from 'react';
import styles from './date-picker.module.css';
import { FieldError } from '../field-error/field-error';
import { FieldLabel } from '../field-label/field-label';

export type DatePickerProps = {
  label?: string;
  error?: string | string[];
} & Omit<ComponentProps<'input'>, 'name' | 'type' | 'className'>;

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <label>
        {label && <FieldLabel>{label}</FieldLabel>}
        <input ref={ref} type="date" className={styles.input} {...props} />
        <FieldError error={error} />
      </label>
    );
  },
);

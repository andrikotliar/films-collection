import styles from './date-picker.module.css';
import { FieldError } from '../field-error/field-error';
import { FieldLabel } from '../field-label/field-label';

export type DatePickerProps = {
  label?: string;
  error?: string | string[];
  ref?: React.RefObject<HTMLInputElement | null>;
} & Omit<React.ComponentProps<'input'>, 'name' | 'type' | 'className'>;

export const DatePicker = ({ label, error, ref, ...props }: DatePickerProps) => {
  return (
    <label className={styles.wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <input ref={ref} type="date" className={styles.input} {...props} />
      <FieldError error={error} />
    </label>
  );
};

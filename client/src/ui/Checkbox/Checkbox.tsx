import { CheckIcon } from 'lucide-react';
import styles from './Checkbox.module.css';
import { ComponentProps, FC, forwardRef } from 'react';

export type CheckboxProps = {
  type: 'checkbox' | 'radio';
  label: string;
} & Omit<ComponentProps<'input'>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ type = 'checkbox', label, ...checkboxInputProps }, ref) => {
    return (
      <label className={styles.checkbox}>
        <input ref={ref} type={type} {...checkboxInputProps} />
        <div className={styles.iconWrapper}>
          <CheckIcon className={styles.icon} />
        </div>
        <div className={styles.title}>{label}</div>
      </label>
    );
  },
);

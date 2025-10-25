import { CheckIcon } from 'lucide-react';
import styles from './styles.module.css';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

export type CheckboxProps = {
  type: 'checkbox' | 'radio';
  label: string;
  rightIcon?: ReactNode;
} & Omit<ComponentProps<'input'>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ type = 'checkbox', label, rightIcon, ...checkboxInputProps }, ref) => {
    return (
      <label className={styles.checkbox}>
        <input ref={ref} type={type} {...checkboxInputProps} />
        <div className={styles.iconWrapper}>
          <CheckIcon className={styles.icon} />
        </div>
        <div className={styles.title}>
          {label}
          {rightIcon}
        </div>
      </label>
    );
  },
);

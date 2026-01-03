import { CheckIcon } from 'lucide-react';
import styles from './checkbox.module.css';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';
import type { StatusColor } from '~/shared/types';
import clsx from 'clsx';

export type CheckboxProps = {
  type: 'checkbox' | 'radio';
  label: string;
  rightIcon?: ReactNode;
  theme?: StatusColor;
} & Omit<ComponentProps<'input'>, 'type'>;

const colorToClassName: Record<StatusColor, string> = {
  blue: styles.blueTheme,
  red: styles.redTheme,
  yellow: styles.yellowTheme,
  gray: styles.grayTheme,
  green: styles.greenTheme,
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ type = 'checkbox', theme = 'blue', label, rightIcon, ...checkboxInputProps }, ref) => {
    return (
      <label className={clsx(styles.checkbox, colorToClassName[theme])}>
        <input ref={ref} type={type} {...checkboxInputProps} />
        <div className={styles.icon_wrapper}>
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

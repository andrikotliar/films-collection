import styles from './status-filter-button.module.css';
import { ChangeEventHandler, forwardRef } from 'react';
import { FieldError } from '../field-error/field-error';
import { CheckIcon } from 'lucide-react';
import { StatusColor } from '@/types';
import classNames from 'classnames';

export type StatusFilterButtonProps = {
  title: string;
  color: StatusColor;
  value?: string;
  isMultiple?: boolean;
  error?: string | string[];
  name?: string;
  defaultChecked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
};

export const StatusFilterButton = forwardRef<
  HTMLInputElement,
  StatusFilterButtonProps
>(({ isMultiple = false, title, error, color, value, ...inputProps }, ref) => {
  const inputType = isMultiple ? 'checkbox' : 'radio';

  return (
    <label>
      <div className={classNames(styles.rootWrapper, styles[color])}>
        <input
          ref={ref}
          type={inputType}
          className={styles.input}
          value={value}
          {...inputProps}
        />
        <div className={styles.iconWrapper}>
          <CheckIcon className={styles.checkIcon} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <FieldError error={error} />
    </label>
  );
});

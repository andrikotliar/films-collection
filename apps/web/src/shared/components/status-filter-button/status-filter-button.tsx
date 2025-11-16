import styles from './styles.module.css';
import { type ChangeEventHandler, forwardRef } from 'react';
import { FieldError } from '../field-error/field-error';
import { CheckIcon } from 'lucide-react';
import { type StatusColor } from '~/shared';
import clsx from 'clsx';

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

export const StatusFilterButton = forwardRef<HTMLInputElement, StatusFilterButtonProps>(
  ({ isMultiple = false, title, error, color, value, ...inputProps }, ref) => {
    const inputType = isMultiple ? 'checkbox' : 'radio';

    return (
      <label>
        <div className={clsx(styles.root_wrapper, styles[color])}>
          <input
            ref={ref}
            type={inputType}
            className={styles.input}
            value={value}
            {...inputProps}
          />
          <div className={styles.icon_wrapper}>
            <CheckIcon className={styles.check_icon} />
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <FieldError error={error} />
      </label>
    );
  },
);

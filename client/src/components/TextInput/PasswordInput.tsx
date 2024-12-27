import classNames from 'classnames';
import styles from './styles.module.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ComponentProps, forwardRef, useState } from 'react';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';

export type PasswordInputProps = {
  label?: string;
  error?: string | string;
} & Omit<ComponentProps<'input'>, 'type' | 'name' | 'className'>;

type InputTypeVariants = 'text' | 'password';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, ...props }, ref) => {
    const [inputType, setInputType] = useState<InputTypeVariants>('password');

    const handleShowPassword = () => {
      setInputType((type) => {
        if (type === 'password') {
          return 'text';
        }

        return 'password';
      });
    };

    return (
      <label className={styles.inputWrapper}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.fieldWrapper}>
          <input
            ref={ref}
            type={inputType}
            className={classNames(styles.textInput, styles.passwordInput)}
            {...props}
          />
          <button
            onClick={handleShowPassword}
            type="button"
            className={styles.showPasswordButton}
          >
            {inputType === 'password' ? (
              <EyeIcon className={styles.eyeIcon} />
            ) : (
              <EyeOffIcon className={styles.eyeIcon} />
            )}
          </button>
        </div>
        <FieldError error={error} />
      </label>
    );
  },
);

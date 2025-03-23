import styles from './PasswordInput.module.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { TextInput, TextInputProps } from '../TextInput/TextInput';

export type PasswordInputProps = Omit<TextInputProps, 'type'>;

type InputTypeVariants = 'text' | 'password';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
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
      <TextInput
        ref={ref}
        type={inputType}
        icon={
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
        }
        {...props}
      />
    );
  },
);

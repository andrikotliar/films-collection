import styles from './password-input.module.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { TextInput, type TextInputProps } from '../text-input/text-input';

export type PasswordInputProps = Omit<TextInputProps, 'type'>;

type InputTypeVariants = 'text' | 'password';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
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
        <button onClick={handleShowPassword} type="button" className={styles.show_password_button}>
          {inputType === 'password' ? (
            <EyeIcon className={styles.eye_icon} />
          ) : (
            <EyeOffIcon className={styles.eye_icon} />
          )}
        </button>
      }
      {...props}
    />
  );
});

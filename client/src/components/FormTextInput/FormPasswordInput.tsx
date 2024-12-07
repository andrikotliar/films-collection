import classNames from 'classnames';
import styles from './styles.module.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldError } from '../FieldError/FieldError';

type FormPasswordProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

type InputTypeVariants = 'text' | 'password';

export const FormPasswordInput: FC<FormPasswordProps> = ({
  name,
  label,
  placeholder,
}) => {
  const { register, formState } = useFormContext();
  const [inputType, setInputType] = useState<InputTypeVariants>('password');

  const { errors } = formState;

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
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.fieldWrapper}>
        <input
          type={inputType}
          {...register(name)}
          placeholder={placeholder}
          className={classNames(styles.textInput, styles.passwordInput)}
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
      <FieldError error={errors[name]?.message as string} />
    </label>
  );
};

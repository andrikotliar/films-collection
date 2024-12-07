import { FC } from 'react';
import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FieldError } from '../FieldError/FieldError';

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const FormTextInput: FC<FormInputProps> = ({
  name,
  label,
  placeholder,
}) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  console.log(errors);

  return (
    <label className={styles.inputWrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        className={styles.textInput}
      />
      <FieldError error={errors[name]?.message as string} />
    </label>
  );
};

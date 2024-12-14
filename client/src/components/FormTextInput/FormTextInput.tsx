import { FC } from 'react';
import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FieldError } from '../FieldError/FieldError';
import { PropsWithClassName } from '@/types';
import classNames from 'classnames';

type FormInputProps = PropsWithClassName<{
  type?: 'text' | 'number';
  name: string;
  label?: string;
  placeholder?: string;
}>;

export const FormTextInput: FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  className,
}) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return (
    <label className={classNames(styles.inputWrapper, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type={type}
        {...register(name, { valueAsNumber: type === 'number' })}
        placeholder={placeholder}
        className={styles.textInput}
      />
      <FieldError error={errors[name]?.message as string} />
    </label>
  );
};

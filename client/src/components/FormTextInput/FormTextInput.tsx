import { FC } from 'react';
import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FieldError } from '../FieldError/FieldError';
import classNames from 'classnames';
import { FormItemLabel } from '../FormItemLabel/FormItemLabel';

type FormInputProps = {
  type?: 'text' | 'number';
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

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
      {label && <FormItemLabel>{label}</FormItemLabel>}
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

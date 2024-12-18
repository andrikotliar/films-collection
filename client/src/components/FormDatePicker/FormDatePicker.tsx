import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './FormDatePicker.module.css';

type FormDatePickerProps = {
  label?: string;
  name: string;
  min?: string;
  max?: string;
};

export const FormDatePicker: FC<FormDatePickerProps> = ({
  label,
  name,
  min,
  max,
}) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return (
    <label>
      {label && <div className={styles.label}>{label}</div>}
      <input
        type="date"
        {...register(name)}
        min={min}
        max={max}
        className={styles.input}
      />
      {errors[name] && typeof errors[name].message === 'string' && (
        <div className={styles.error}>{errors[name].message}</div>
      )}
    </label>
  );
};

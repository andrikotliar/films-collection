import { FC } from 'react';
import { DatePicker, DatePickerProps } from './date-picker';
import { useFormContext } from 'react-hook-form';

type FormDatePickerProps = {
  name: string;
} & DatePickerProps;

export const FormDatePicker: FC<FormDatePickerProps> = ({ name, ...props }) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return (
    <DatePicker
      {...register(name)}
      error={errors[name]?.message as string}
      {...props}
    />
  );
};

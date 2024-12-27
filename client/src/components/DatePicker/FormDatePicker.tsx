import { FC } from 'react';
import { DatePicker } from './DatePicker';
import { useFormContext } from 'react-hook-form';

type FormDatePickerProps = {
  name: string;
};

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

import { useFormContext } from 'react-hook-form';
import { DatePicker, DatePickerProps } from './date-picker';

type FormDatePickerProps = {
  name: string;
} & DatePickerProps;

export const FormDatePicker = ({ name, ...props }: FormDatePickerProps) => {
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

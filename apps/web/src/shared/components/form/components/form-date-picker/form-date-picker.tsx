import { useFormContext } from 'react-hook-form';
import { DatePicker, type DatePickerProps } from '~/shared/components/date-picker/date-picker';
import type { FormFieldProps } from '~/shared/types';

export const FormDatePicker = ({ name, ...props }: FormFieldProps<DatePickerProps>) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return <DatePicker {...register(name)} error={errors[name]?.message as string} {...props} />;
};

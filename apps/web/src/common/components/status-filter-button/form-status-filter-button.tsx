import type { FormFieldProps } from '~/common/types';
import { StatusFilterButton, type StatusFilterButtonProps } from './status-filter-button';
import { useFormContext } from 'react-hook-form';

export const FormStatusFilterButton = ({
  name,
  ...statusButtonProps
}: FormFieldProps<Omit<StatusFilterButtonProps, 'onChange' | 'onBlur' | 'name'>>) => {
  const { register } = useFormContext();

  return <StatusFilterButton {...register(name)} {...statusButtonProps} />;
};

import type { FormFieldProps } from '~/lib/types';
import { useFormContext } from 'react-hook-form';
import {
  StatusFilterButton,
  type StatusFilterButtonProps,
} from '~/lib/components/status-filter-button/status-filter-button';

export const FormStatusFilterButton = ({
  name,
  ...statusButtonProps
}: FormFieldProps<Omit<StatusFilterButtonProps, 'onChange' | 'onBlur' | 'name'>>) => {
  const { register } = useFormContext();

  return <StatusFilterButton {...register(name)} {...statusButtonProps} />;
};

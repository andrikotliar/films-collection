import {
  StatusFilterButton,
  StatusFilterButtonProps,
} from './status-filter-button';
import { useFormContext } from 'react-hook-form';

type FormStatusFilterButtonProps = {
  name: string;
} & Omit<StatusFilterButtonProps, 'onChange' | 'onBlur' | 'name'>;

export const FormStatusFilterButton = ({
  name,
  ...statusButtonProps
}: FormStatusFilterButtonProps) => {
  const { register } = useFormContext();

  return <StatusFilterButton {...register(name)} {...statusButtonProps} />;
};

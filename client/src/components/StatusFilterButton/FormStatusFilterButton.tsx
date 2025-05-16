import { FC } from 'react';
import {
  StatusFilterButton,
  StatusFilterButtonProps,
} from './StatusFilterButton';
import { useFormContext } from 'react-hook-form';

type FormStatusFilterButtonProps = {
  name: string;
} & Omit<StatusFilterButtonProps, 'onChange' | 'onBlur' | 'name'>;

export const FormStatusFilterButton: FC<FormStatusFilterButtonProps> = ({
  name,
  ...statusButtonProps
}) => {
  const { register } = useFormContext();

  return <StatusFilterButton {...register(name)} {...statusButtonProps} />;
};

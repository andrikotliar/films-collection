import type { FormFieldProps } from '~/common/types';
import { Checkbox, type CheckboxProps } from './checkbox';
import { useFormContext } from 'react-hook-form';

export const FormCheckbox = ({ name, ...props }: FormFieldProps<CheckboxProps>) => {
  const { register } = useFormContext();

  return <Checkbox {...register(name)} {...props} />;
};

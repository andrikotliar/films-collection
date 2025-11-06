import type { FormFieldProps } from '~/lib/types';
import { useFormContext } from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '~/lib/components/checkbox/checkbox';

export const FormCheckbox = ({ name, ...props }: FormFieldProps<CheckboxProps>) => {
  const { register } = useFormContext();

  return <Checkbox {...register(name)} {...props} />;
};

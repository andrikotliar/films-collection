import { Checkbox, CheckboxProps } from './checkbox';
import { useFormContext } from 'react-hook-form';

type FormCheckboxProps = {
  name: string;
} & CheckboxProps;

export const FormCheckbox = ({ name, ...props }: FormCheckboxProps) => {
  const { register } = useFormContext();

  return <Checkbox {...register(name)} {...props} />;
};

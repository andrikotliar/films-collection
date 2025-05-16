import { FC } from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';
import { useFormContext } from 'react-hook-form';

type FormCheckboxProps = {
  name: string;
} & CheckboxProps;

export const FormCheckbox: FC<FormCheckboxProps> = ({ name, ...props }) => {
  const { register } = useFormContext();

  return <Checkbox {...register(name)} {...props} />;
};

import classes from './FormCheckbox.module.css';
import { FC } from 'react';
import { Checkmark } from '@/assets/icons';
import { useFormContext } from 'react-hook-form';

type FormCheckboxProps = {
  type: 'checkbox' | 'radio';
  value: string | number;
  name: string;
};

const FormCheckbox: FC<FormCheckboxProps> = ({
  type = 'checkbox',
  value,
  name,
}) => {
  const { register } = useFormContext();

  return (
    <label className={classes.formCheckbox}>
      <input
        type={type}
        value={value}
        {...register(name)}
        name={name}
      />
      <div className={classes.icon}>
        <Checkmark />
      </div>
      <div className={classes.title}>{value}</div>
    </label>
  );
};

export { FormCheckbox };

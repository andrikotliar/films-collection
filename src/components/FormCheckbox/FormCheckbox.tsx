import classes from './FormCheckbox.module.css';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Check } from 'lucide-react';

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
      <input type={type} value={value} {...register(name)} />
      <div className={classes.iconWrapper}>
        <Check className={classes.icon} />
      </div>
      <div className={classes.title}>{value}</div>
    </label>
  );
};

export { FormCheckbox };

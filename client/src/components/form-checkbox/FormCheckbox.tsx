import { CheckIcon } from 'lucide-react';
import styles from './FormCheckbox.module.css';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type FormCheckboxProps = {
  type: 'checkbox' | 'radio';
  label: string;
  value: string | number;
  name: string;
};

const FormCheckbox: FC<FormCheckboxProps> = ({
  type = 'checkbox',
  label,
  value,
  name,
}) => {
  const { register } = useFormContext();

  return (
    <label className={styles.formCheckbox}>
      <input type={type} value={value} {...register(name)} />
      <div className={styles.iconWrapper}>
        <CheckIcon className={styles.icon} />
      </div>
      <div className={styles.title}>{label}</div>
    </label>
  );
};

export { FormCheckbox };

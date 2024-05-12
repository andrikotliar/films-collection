import { Icons } from '@/components/icons/Icons';
import styles from './FormCheckbox.module.css';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  type: 'checkbox' | 'radio';
  value: string | number;
  name: string;
};

const FormCheckbox: FC<Props> = ({ type = 'checkbox', value, name }) => {
  const { register } = useFormContext();

  return (
    <label className={styles.formCheckbox}>
      <input type={type} value={value} {...register(name)} />
      <div className={styles.iconWrapper}>
        <Icons icon="check" className={styles.icon} />
      </div>
      <div className={styles.title}>{value}</div>
    </label>
  );
};

export { FormCheckbox };

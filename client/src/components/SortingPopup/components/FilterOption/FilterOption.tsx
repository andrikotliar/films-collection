import { ComponentProps, FC } from 'react';
import styles from './FilterOption.module.css';

type FilterOptionProps = ComponentProps<'input'> & {
  label: string;
};

export const FilterOption: FC<FilterOptionProps> = ({
  label,
  ...inputProps
}) => {
  return (
    <label>
      <input {...inputProps} className={styles.radioButton} />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

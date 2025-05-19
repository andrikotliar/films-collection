import { StarIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './rating-input.module.css';
import { FieldLabel } from '../field-label/field-label';

export type RatingInputProps = {
  name: string;
  size: number;
  onChange: (value: number) => void;
  defaultValue: number;
  label?: string;
};

export const RatingInput: FC<RatingInputProps> = ({
  size,
  name,
  onChange,
  defaultValue,
  label,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={styles.rating}>
        {Array.from({ length: size }, (_, index) => {
          const value = size - index;
          return (
            <label className={styles.label} key={index}>
              <input
                type="radio"
                className={styles.input}
                name={name}
                checked={value === defaultValue}
                onChange={() => onChange(value)}
              />
              <StarIcon className={styles.starIcon} />
            </label>
          );
        })}
      </div>
    </div>
  );
};

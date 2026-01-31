import styles from './option.module.css';
import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ListOption } from '@films-collection/shared';

type OptionProps = {
  onSelect: (value: ListOption, isActive: boolean) => void;
  data: ListOption<any>;
  selectedValues: (string | number)[];
};

export const Option = forwardRef<HTMLButtonElement, OptionProps>(
  ({ onSelect, data, selectedValues }, ref) => {
    const isActive = selectedValues.includes(data.value);

    return (
      <button
        ref={ref}
        onClick={() => onSelect(data, isActive)}
        className={clsx(styles.option, {
          [styles.active]: isActive,
        })}
        type="button"
        role="option"
      >
        {data.label}
      </button>
    );
  },
);

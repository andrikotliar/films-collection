import styles from './styles.module.css';
import { forwardRef } from 'react';
import { type ListOption } from '~/common';
import clsx from 'clsx';

type Props = {
  onSelect: (value: ListOption<any>['value'], isActive: boolean) => void;
  data: ListOption<any>;
  selectedValues: (string | number)[];
};

export const Option = forwardRef<HTMLButtonElement, Props>(
  ({ onSelect, data, selectedValues }, ref) => {
    const isActive = selectedValues.includes(data.value);

    return (
      <button
        ref={ref}
        onClick={() => onSelect(data.value, isActive)}
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

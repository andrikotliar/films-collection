import styles from './option.module.css';
import { forwardRef } from 'react';
import { ListOption } from '~/common';
import classNames from 'classnames';

type OptionProps = {
  onSelect: (value: ListOption<any>['value'], isActive: boolean) => void;
  data: ListOption<any>;
  selectedValues: (string | number)[];
};

export const Option = forwardRef<HTMLButtonElement, OptionProps>(
  ({ onSelect, data, selectedValues }, ref) => {
    const isActive = selectedValues.includes(data.value);

    return (
      <button
        ref={ref}
        onClick={() => onSelect(data.value, isActive)}
        className={classNames(styles.option, {
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

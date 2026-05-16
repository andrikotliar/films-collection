import styles from './option.module.css';
import clsx from 'clsx';
import type { ListOption } from '@films-collection/shared';

type OptionProps = {
  onSelect: (value: ListOption, isActive: boolean) => void;
  data: ListOption<any>;
  selectedValues: (string | number)[];
  ref?: React.RefObject<HTMLButtonElement | null>;
};

export const Option = ({ onSelect, data, selectedValues, ref }: OptionProps) => {
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
};

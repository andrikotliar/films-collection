import { MinusIcon, PlusIcon } from 'lucide-react';
import { FC, useState } from 'react';
import styles from './Counter.module.css';

type CounterProps = {
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  increase?: boolean;
  decrease?: boolean;
  label?: string;
  isDisabled?: boolean;
};

export const Counter: FC<CounterProps> = ({
  defaultValue = 0,
  onChange,
  increase = true,
  decrease = true,
  minValue = 0,
  maxValue,
  label,
  isDisabled = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChangeValue = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const isDecreaseDisabled = value === minValue || !decrease || isDisabled;
  const isIncreaseDisabled =
    Boolean(maxValue && value === maxValue) || !increase || isDisabled;

  return (
    <div className={styles.counterWrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.tools}>
        <button
          onClick={() => handleChangeValue(value - 1)}
          disabled={isDecreaseDisabled}
          className={styles.button}
        >
          <MinusIcon size={15} />
        </button>
        <div className={styles.counter}>{value}</div>
        <button
          onClick={() => handleChangeValue(value + 1)}
          disabled={isIncreaseDisabled}
          className={styles.button}
        >
          <PlusIcon size={15} />
        </button>
      </div>
    </div>
  );
};

import { FieldLabel } from '~/shared/components/field-label/field-label';
import { monthOptions } from '~/shared/components/month-date-selector/configs';
import { Select } from '~/shared/components/select/select';
import styles from "./month-date-selector.module.css";
import clsx from 'clsx';
import { getDateCode, getDateCodeParts, getDefaultDateCode, type FormError } from '~/shared';
import { FieldError } from '~/shared/components/field-error/field-error';

export type MonthDateSelectorProps = {
  value?: number;
  label?: string;
  error?: FormError;
  onChange: (dateCode: number) => void;
};

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MonthDateSelector = ({
  value = getDefaultDateCode(),
  label,
  error,
  onChange,
}: MonthDateSelectorProps) => {
  const dateParts = getDateCodeParts(value);
  const selectedMonth = dateParts[0];
  const selectedDate = dateParts[1];

  const handleSelectMonth = (value: number) => {
    onChange(getDateCode(value, selectedDate));
  };

  const handleSelectDate = (value: number) => {
    onChange(getDateCode(selectedMonth, value));
  };

  return (
    <div className={styles.wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={styles.main}>
        <Select
          options={monthOptions}
          value={selectedMonth}
          onSelect={handleSelectMonth}
          isSearchable={false}
          onClear={() => handleSelectMonth(1)}
        />
        <div className={styles.grid}>
          {Array.from({ length: monthDays[selectedMonth - 1] }, (_, index) => (
            <button
              type="button"
              onClick={() => handleSelectDate(index + 1)}
              className={clsx(styles.date, {
                [styles.selected]: selectedDate === index + 1,
              })}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <FieldError error={error} />
    </div>
  );
};

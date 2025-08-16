import { FieldLabel } from '@/components/field-label/field-label';
import { monthOptions } from '@/components/month-date-selector/configs';
import { Select } from '@/components/select';
import styles from './styles.module.css';
import classNames from 'classnames';
import type { FormError } from '@/common';
import { FieldError } from '@/components/field-error/field-error';

export type MonthDateSelectorProps = {
  initialYear?: number;
  value: string;
  label?: string;
  error?: FormError;
  onChange: (date: string) => void;
};

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MonthDateSelector = ({
  initialYear,
  value,
  label,
  error,
  onChange,
}: MonthDateSelectorProps) => {
  const year = initialYear ? initialYear : new Date().getFullYear().toString();
  const dateParts = value?.split('-');
  const selectedMonth = Number(dateParts[1]);
  const selectedDate = Number(dateParts[2]);

  const handleSelectMonth = (value: number) => {
    onChange(`${year}-${String(value).padStart(2, '0')}-01`);
  };

  const handleSelectDate = (value: number) => {
    onChange(`${year}-${String(selectedMonth).padStart(2, '0')}-${String(value).padStart(2, '0')}`);
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
              className={classNames(styles.date, {
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

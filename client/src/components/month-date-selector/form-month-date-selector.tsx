import { Controller, useFormContext } from 'react-hook-form';
import { MonthDateSelector, type MonthDateSelectorProps } from './month-date-selector';

type FormMonthDateSelectorProps = {
  name: string;
} & Omit<MonthDateSelectorProps, 'onChange' | 'value'>;

export const FormMonthDateSelector = ({ name, ...props }: FormMonthDateSelectorProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <MonthDateSelector value={value} onChange={onChange} {...props} />
      )}
    />
  );
};

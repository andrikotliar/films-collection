import { Controller, useFormContext } from 'react-hook-form';
import {
  MonthDateSelector,
  type MonthDateSelectorProps,
} from '~/common/components/month-date-selector/month-date-selector';
import type { FormFieldProps } from '~/common/types';

export const FormMonthDateSelector = ({
  name,
  ...props
}: FormFieldProps<Omit<MonthDateSelectorProps, 'onChange' | 'value'>>) => {
  const { control, formState } = useFormContext();

  const { errors } = formState;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <MonthDateSelector
          value={value}
          onChange={onChange}
          error={errors[name]?.message as string}
          {...props}
        />
      )}
    />
  );
};

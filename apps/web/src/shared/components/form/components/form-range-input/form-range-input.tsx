import { Controller, useFormContext } from 'react-hook-form';
import { RangeInput, type RangeInputProps } from '~/shared/components/range-input/range-input';
import type { FormFieldProps } from '~/shared/types';

export const FormRangeInput = ({
  name,
  ...props
}: FormFieldProps<Omit<RangeInputProps, 'onChange' | 'value'>>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RangeInput onChange={onChange} value={value} {...props} />
      )}
    />
  );
};

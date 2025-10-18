import { AsyncSelect, type AsyncSelectProps } from './async-select';
import { Controller, useFormContext } from 'react-hook-form';

type FormAsyncSelectProps = {
  name: string;
} & Omit<AsyncSelectProps, 'initialValue' | 'onSelect'>;

export const FormAsyncSelect = ({ name, ...props }: FormAsyncSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <AsyncSelect value={value} onSelect={onChange} {...props} />
      )}
    />
  );
};

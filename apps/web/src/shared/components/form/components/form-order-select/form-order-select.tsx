import { Controller, useFormContext } from 'react-hook-form';
import { OrderSelect, type OrderSelectProps } from '~/shared/components/order-select/order-select';
import type { FormFieldProps } from '~/shared/types';

type FormOrderSelectProps = FormFieldProps<Omit<OrderSelectProps, 'onChange' | 'value'>>;

export const FormOrderSelect = ({ name, ...props }: FormOrderSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <OrderSelect value={value} onChange={onChange} {...props} />
      )}
    />
  );
};

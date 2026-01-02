import type { FormFieldProps } from '~/shared/types';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '~/shared/components/checkbox/checkbox';

export const FormCheckbox = ({
  name,
  isNumeric = false,
  type = 'checkbox',
  ...props
}: FormFieldProps<
  CheckboxProps & {
    isNumeric?: boolean;
  }
>) => {
  const { control, watch } = useFormContext();
  const watchedValue = watch(name);

  const handleChange = (value: any, onChange: (...event: any[]) => void) => {
    const transformedValue = isNumeric && !isNaN(value) ? Number(value) : value;
    if (type === 'radio') {
      onChange(transformedValue);
      return;
    }

    if (watchedValue.includes(transformedValue)) {
      const filteredValues = watchedValue.filter((v: unknown) => v !== transformedValue);
      onChange(filteredValues);
      return;
    }

    onChange([...watchedValue, transformedValue]);
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={type === 'checkbox' ? [] : undefined}
      render={({ field: { onChange, value } }) => {
        return (
          <Checkbox
            type={type}
            onChange={() => handleChange(props.value, onChange)}
            checked={type === 'checkbox' ? value.includes(props.value) : value === props.value}
            {...props}
          />
        );
      }}
    />
  );
};

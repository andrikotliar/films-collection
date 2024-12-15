import { ComponentProps, FC } from 'react';
import ReactSelect from 'react-select';

export type SelectProps = ComponentProps<typeof ReactSelect>;

export const Select: FC<SelectProps> = (props) => {
  return (
    <ReactSelect
      {...props}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? '#006db7' : '#ddd',
          borderRadius: 8,
          height: 41,
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? '#006db7' : '#ddd',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
      }}
    />
  );
};

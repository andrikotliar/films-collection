import type { FormFieldProps } from '~/common/types';
import { RatingInput, type RatingInputProps } from './rating-input';
import { Controller, useFormContext } from 'react-hook-form';

export const FormRatingInput = ({
  name,
  ...props
}: FormFieldProps<Pick<RatingInputProps, 'size' | 'label'>>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <RatingInput name={name} onChange={onChange} defaultValue={Number(value)} {...props} />
      )}
    />
  );
};

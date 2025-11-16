import type { FormFieldProps } from '~/shared/types';
import { Controller, useFormContext } from 'react-hook-form';
import { RatingInput, type RatingInputProps } from '~/shared/components/rating-input/rating-input';

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

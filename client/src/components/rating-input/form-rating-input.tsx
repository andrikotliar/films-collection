import { RatingInput, RatingInputProps } from './rating-input';
import { Controller, useFormContext } from 'react-hook-form';

type FormRatingInputProps = {
  name: string;
} & Pick<RatingInputProps, 'size' | 'label'>;

export const FormRatingInput = ({ name, ...props }: FormRatingInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <RatingInput
          name={name}
          onChange={onChange}
          defaultValue={Number(value)}
          {...props}
        />
      )}
    />
  );
};

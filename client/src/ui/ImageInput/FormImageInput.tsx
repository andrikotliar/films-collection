import { FC } from 'react';
import { ImageInput, ImageInputProps } from './ImageInput';
import { useFormContext } from 'react-hook-form';

type FormImageInputProps = {
  name: string;
} & Omit<ImageInputProps, 'url'>;

export const FormImageInput: FC<FormImageInputProps> = ({ name, ...props }) => {
  const { register, formState, watch } = useFormContext();

  const { errors } = formState;

  const currentValue = watch(name);

  return (
    <ImageInput
      error={errors[name]?.message as string}
      externalWatchedValue={currentValue}
      {...register(name)}
      {...props}
    />
  );
};

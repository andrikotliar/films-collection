import { FC } from 'react';
import { VideoInputProps, VideoInput } from './VideoInput';
import { useFormContext } from 'react-hook-form';

type FormVideoInputProps = {
  name: string;
} & Omit<VideoInputProps, 'externalWatchedValue'>;

export const FormVideoInput: FC<FormVideoInputProps> = ({ name, ...props }) => {
  const { register, formState, watch } = useFormContext();

  const { errors } = formState;

  const currentValue = watch(name);

  return (
    <VideoInput
      error={errors[name]?.message as string}
      externalWatchedValue={currentValue}
      {...register(name)}
      {...props}
    />
  );
};

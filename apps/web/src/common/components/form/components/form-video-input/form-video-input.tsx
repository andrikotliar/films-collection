import type { FormFieldProps } from '~/common/types';
import { useFormContext } from 'react-hook-form';
import { VideoInput, type VideoInputProps } from '~/common/components/video-input/video-input';

export const FormVideoInput = ({
  name,
  ...props
}: FormFieldProps<Omit<VideoInputProps, 'externalWatchedValue'>>) => {
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

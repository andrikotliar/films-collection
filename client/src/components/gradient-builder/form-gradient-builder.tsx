import { Controller, useFormContext } from 'react-hook-form';
import { GradientBuilder, type GradientBuilderProps } from './gradient-builder';
import { getErrorMessageFromObject } from '@/common';

type FormGradientBuilderProps = {
  name: string;
} & Omit<GradientBuilderProps, 'onChange'>;

export const FormGradientBuilder = ({
  name,
  ...props
}: FormGradientBuilderProps) => {
  const { control, formState } = useFormContext();

  const errorMessage = getErrorMessageFromObject(formState.errors[name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <GradientBuilder
          value={value}
          onChange={onChange}
          error={errorMessage}
          {...props}
        />
      )}
    />
  );
};

import type { ReactNode } from 'react';
import { FormProvider, useForm, type DefaultValues } from 'react-hook-form';
import type { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/button/button';
import { SaveIcon } from 'lucide-react';
import { FormTitle } from '@/components/form-title/form-title';

type FormProps<
  TDefaultValues extends Record<PropertyKey, unknown>,
  TSchema extends ObjectSchema<any>,
> = {
  children?: ReactNode;
  onSubmit: (data: TDefaultValues) => Promise<unknown>;
  defaultValues?: DefaultValues<TDefaultValues>;
  schema: TSchema;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
  submitIcon?: ReactNode;
  shouldShowResetButton?: boolean;
  onReset?: VoidFunction;
};

export const Form = <
  TDefaultValues extends Record<PropertyKey, unknown>,
  TSchema extends ObjectSchema<any>,
>({
  children,
  onSubmit,
  defaultValues,
  schema,
  isLoading = false,
  submitButtonText = 'Save',
  title,
  submitIcon = <SaveIcon />,
  shouldShowResetButton = false,
  onReset,
}: FormProps<TDefaultValues, TSchema>) => {
  const form = useForm<TDefaultValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        {title && <FormTitle>{title}</FormTitle>}
        {children}
        <div className="flex flex-col gap-5">
          <Button type="submit" isDisabled={isLoading} isLoading={isLoading} icon={submitIcon}>
            {submitButtonText}
          </Button>
          {shouldShowResetButton && (
            <Button
              variant="secondary"
              onClick={() => {
                form.reset(defaultValues);
                onReset?.();
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

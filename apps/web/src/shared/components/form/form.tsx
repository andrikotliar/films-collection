import styles from './form.module.css';
import { FormProvider, useForm, type DefaultValues } from 'react-hook-form';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/shared/components/button/button';
import { RotateCwIcon, SaveIcon } from 'lucide-react';
import {
  FormArrayFieldWrapper,
  FormArrayWrapper,
  FormAsyncSelect,
  FormCheckbox,
  FormCheckboxesGroup,
  FormDatePicker,
  FormDateRange,
  FormFileInput,
  FormGroup,
  FormMonthDateSelector,
  FormOrderSelect,
  FormPasswordInput,
  FormRatingInput,
  FormSection,
  FormSelect,
  FormTextArea,
  FormTextEditor,
  FormTextInput,
  FormTitle,
  FormToggle,
  FormVideoInput,
} from '~/shared/components/form/components';
import { useEffect } from 'react';
import clsx from 'clsx';

type FormResetHandler<TDefaultValues extends Record<PropertyKey, unknown>> = (
  values: TDefaultValues,
) => void;

type FormProps<TDefaultValues extends Record<PropertyKey, unknown>, TSchema extends z.ZodType> = {
  onSubmit: (data: TDefaultValues) => Promise<unknown>;
  defaultValues?: DefaultValues<TDefaultValues>;
  schema: TSchema;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
  submitIcon?: React.ReactNode;
  children?: React.ReactNode;
  onReset?: (formReset: FormResetHandler<TDefaultValues>) => void;
  islandActions?: boolean;
};

export const Form = <
  TDefaultValues extends Record<PropertyKey, unknown>,
  TSchema extends z.ZodType<unknown>,
>({
  children,
  onSubmit,
  defaultValues,
  schema,
  isLoading = false,
  submitButtonText = 'Save',
  title,
  submitIcon = <SaveIcon />,
  onReset,
  islandActions = false,
}: FormProps<TDefaultValues, TSchema>) => {
  const form = useForm<TDefaultValues>({
    resolver: zodResolver(schema as any),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  return (
    <FormProvider {...form}>
      <form className={styles.flex_wrapper} onSubmit={form.handleSubmit(onSubmit)}>
        {title && <FormTitle>{title}</FormTitle>}
        {children}
        <div className={clsx(styles.actions, islandActions && styles.island_actions)}>
          {onReset && (
            <Button variant="secondary" onClick={() => onReset(form.reset)} icon={<RotateCwIcon />}>
              Reset
            </Button>
          )}
          <Button type="submit" isDisabled={isLoading} isLoading={isLoading} icon={submitIcon}>
            {submitButtonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

Form.ArrayFieldWrapper = FormArrayFieldWrapper;
Form.ArrayWrapper = FormArrayWrapper;
Form.AsyncSelect = FormAsyncSelect;
Form.Checkbox = FormCheckbox;
Form.CheckboxesGroup = FormCheckboxesGroup;
Form.DatePicker = FormDatePicker;
Form.DateRange = FormDateRange;
Form.FileInput = FormFileInput;
Form.Group = FormGroup;
Form.MonthDateSelector = FormMonthDateSelector;
Form.RatingInput = FormRatingInput;
Form.Section = FormSection;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
Form.TextEditor = FormTextEditor;
Form.TextInput = FormTextInput;
Form.Title = FormTitle;
Form.Toggle = FormToggle;
Form.VideoInput = FormVideoInput;
Form.OrderSelect = FormOrderSelect;
Form.PasswordInput = FormPasswordInput;

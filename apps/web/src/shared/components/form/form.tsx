import styles from "./form.module.css";
import type { PropsWithChildren, ReactNode } from 'react';
import { FormProvider, useForm, type DefaultValues } from 'react-hook-form';
import type { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '~/shared/components/button/button';
import { SaveIcon } from 'lucide-react';
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
  FormRatingInput,
  FormSection,
  FormSelect,
  FormStatusFilterButton,
  FormTextArea,
  FormTextEditor,
  FormTextInput,
  FormTitle,
  FormToggle,
  FormVideoInput,
} from '~/shared/components/form/components';

type FormProps<
  TDefaultValues extends Record<PropertyKey, unknown>,
  TSchema extends ObjectSchema<any>,
> = PropsWithChildren<{
  onSubmit: (data: TDefaultValues) => Promise<unknown>;
  defaultValues?: DefaultValues<TDefaultValues>;
  schema: TSchema;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
  submitIcon?: ReactNode;
  shouldShowResetButton?: boolean;
  onReset?: VoidFunction;
}>;

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
      <form className={styles.flex_wrapper} onSubmit={form.handleSubmit(onSubmit)}>
        {title && <FormTitle>{title}</FormTitle>}
        {children}
        <div className={styles.flex_wrapper}>
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
Form.StatusFilterButton = FormStatusFilterButton;
Form.TextArea = FormTextArea;
Form.TextEditor = FormTextEditor;
Form.TextInput = FormTextInput;
Form.Title = FormTitle;
Form.Toggle = FormToggle;
Form.VideoInput = FormVideoInput;

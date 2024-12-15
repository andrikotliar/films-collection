import styles from './FormSelect.module.css';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectProps } from '../Select/Select';
import { FormItemLabel } from '../FormItemLabel/FormItemLabel';
import { PropsWithClassName } from '@/types';
import classNames from 'classnames';
import { FieldError } from '../FieldError/FieldError';

type FormSelectProps = {
  name: string;
  label?: string;
} & SelectProps;

export const FormSelect: FC<PropsWithClassName<FormSelectProps>> = ({
  name,
  label,
  className,
  ...selectProps
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <label className={classNames(styles.selectWrapper, className)}>
      {label && <FormItemLabel>{label}</FormItemLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select {...selectProps} onChange={onChange} value={value} />
        )}
      />
      {errors[name] && <FieldError error={errors[name].message as string} />}
    </label>
  );
};

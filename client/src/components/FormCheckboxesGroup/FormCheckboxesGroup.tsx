import { FC } from 'react';
import { FormCheckbox } from '../Checkbox/FormCheckbox';
import { CheckboxProps } from '../Checkbox';
import styles from './FormCheckboxesGroup.module.css';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { FieldError } from '../FieldError/FieldError';
import { useFormContext } from 'react-hook-form';
import { ListOption } from '@/types';

type FormCheckboxesGroupProps = {
  label?: string;
  name: string;
  options: ListOption[];
  type: CheckboxProps['type'];
};

export const FormCheckboxesGroup: FC<FormCheckboxesGroupProps> = ({
  label,
  options,
  name,
  type,
}) => {
  const form = useFormContext();

  const { errors } = form.formState;

  return (
    <div>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={styles.group}>
        {options.map((option) => (
          <FormCheckbox
            key={option.value}
            label={option.label}
            name={name}
            type={type}
            value={option.value}
          />
        ))}
      </div>
      <FieldError error={errors[name]?.message as string | undefined} />
    </div>
  );
};

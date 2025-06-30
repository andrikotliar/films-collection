import styles from './form-checkboxes-group.module.css';
import { FormCheckbox } from '../checkbox/form-checkbox';
import { CheckboxProps } from '../checkbox';
import { FieldLabel } from '../field-label/field-label';
import { FieldError } from '../field-error/field-error';
import { useFormContext } from 'react-hook-form';
import { ListOption } from '@/types';

type FormCheckboxesGroupProps = {
  label?: string;
  name: string;
  options: ListOption[];
  type: CheckboxProps['type'];
};

export const FormCheckboxesGroup = ({
  label,
  options,
  name,
  type,
}: FormCheckboxesGroupProps) => {
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

import { FC } from 'react';
import { FormCheckbox } from '../Checkbox/FormCheckbox';
import { CheckboxProps } from '../Checkbox';
import styles from './FormCheckboxesGroup.module.css';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { FieldError } from '../FieldError/FieldError';
import { useFormContext } from 'react-hook-form';

type FormCheckboxesGroupProps = {
  label?: string;
  name: string;
  options: string[];
  type: CheckboxProps['type'];
  error?: string | string[];
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
            key={option}
            label={option}
            name={name}
            type={type}
            value={option}
          />
        ))}
      </div>
      <FieldError error={errors[name]?.message as string | undefined} />
    </div>
  );
};

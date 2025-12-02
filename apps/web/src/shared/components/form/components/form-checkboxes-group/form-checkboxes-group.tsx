import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FieldError, FieldLabel, type CheckboxProps, type ListOption } from '~/shared';
import { FormCheckbox } from '~/shared/components/form/components/form-checkbox/form-checkbox';

type FormCheckboxesGroupProps = {
  label?: string;
  name: string;
  options: ListOption[];
  type: CheckboxProps['type'];
};

export const FormCheckboxesGroup = ({ label, options, name, type }: FormCheckboxesGroupProps) => {
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

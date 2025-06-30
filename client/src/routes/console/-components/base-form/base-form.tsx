import styles from './base-form.module.css';
import { Button, FormTextInput, FormTitle, Panel } from '@/components';
import { SaveIcon } from 'lucide-react';
import { ReactNode } from 'react';

type BaseFormProps = {
  title?: string;
  onSubmit: VoidFunction;
  isSaving: boolean;
  children?: ReactNode;
};

export const BaseForm = ({
  onSubmit,
  title,
  children,
  isSaving,
}: BaseFormProps) => {
  return (
    <Panel>
      <form className={styles.form} onSubmit={onSubmit}>
        {title && <FormTitle>{title}</FormTitle>}
        <FormTextInput name="title" label="Title" />
        {children}
        <Button type="submit" isLoading={isSaving} icon={<SaveIcon />}>
          Save
        </Button>
      </form>
    </Panel>
  );
};

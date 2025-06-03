import styles from './base-form.module.css';
import { Button, FormTextInput, FormTitle, Panel } from '@/components';
import { SaveIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type BaseFormProps = PropsWithChildren<{
  title?: string;
  onSubmit: VoidFunction;
  isSaving: boolean;
}>;

export const BaseForm: FC<BaseFormProps> = ({
  onSubmit,
  title,
  children,
  isSaving,
}) => {
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

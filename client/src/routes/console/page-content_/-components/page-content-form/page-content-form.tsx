import styles from './page-content-form.module.css';
import { Button, FormTextEditor, FormTextInput } from '@/components';

type PageContentFormProps = {
  onSubmit: VoidFunction;
  isLoading: boolean;
};

export const PageContentForm = ({
  isLoading,
  onSubmit,
}: PageContentFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormTextInput name="title" label="Title" />
      <FormTextEditor name="content" label="Content" />
      <FormTextInput name="pageKey" label="Page Key" />
      <Button type="submit" isDisabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

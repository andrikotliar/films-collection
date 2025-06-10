import styles from './post-form.module.css';
import { Button, FormTextEditor, FormTextInput } from '@/components';

type PostFormProps = {
  onSubmit: VoidFunction;
  isLoading: boolean;
};

export const PostForm = ({ isLoading, onSubmit }: PostFormProps) => {
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

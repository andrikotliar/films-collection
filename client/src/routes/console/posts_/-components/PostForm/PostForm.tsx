import styles from './PostForm.module.css';
import { Button, FormTextEditor, FormTextInput } from '@/components';
import { FC } from 'react';

type PostFormProps = {
  onSubmit: VoidFunction;
  isLoading: boolean;
};

export const PostForm: FC<PostFormProps> = ({ onSubmit, isLoading }) => {
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

import styles from './person-form.module.css';
import { FC } from 'react';
import { SaveIcon } from 'lucide-react';
import {
  Button,
  FormFileInput,
  FormTextInput,
  FormTitle,
  Panel,
} from '@/components';

export type PersonFormProps = {
  title?: string;
  onSubmit: VoidFunction;
  isLoading?: boolean;
};

export const PersonForm: FC<PersonFormProps> = ({
  onSubmit,
  title = 'Create person',
  isLoading = false,
}) => {
  return (
    <Panel>
      <div className={styles.form}>
        <FormTitle>{title}</FormTitle>
        <FormTextInput name="name" label="Person name" />
        <FormFileInput name="image" label="Person photo" width={150} />
        <Button onClick={onSubmit} isLoading={isLoading} icon={<SaveIcon />}>
          Submit
        </Button>
      </div>
    </Panel>
  );
};

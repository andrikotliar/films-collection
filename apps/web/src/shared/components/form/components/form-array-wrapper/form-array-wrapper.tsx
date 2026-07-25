import styles from './form-array-wrapper.module.css';
import { PlusIcon } from 'lucide-react';
import { Button } from '~/shared/components/button/button';

type FormArrayWrapperProps = {
  onCreate: VoidFunction;
  createButtonLabel?: string;
  children?: React.ReactNode;
};

export const FormArrayWrapper = ({
  children,
  onCreate,
  createButtonLabel = 'Add item',
}: FormArrayWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
      <div>
        <Button onClick={onCreate} icon={<PlusIcon />} variant="secondary">
          {createButtonLabel}
        </Button>
      </div>
    </div>
  );
};

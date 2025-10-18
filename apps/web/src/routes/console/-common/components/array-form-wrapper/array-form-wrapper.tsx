import styles from './array-form-wrapper.module.css';
import { Button } from '~/components';
import { ReactNode } from 'react';
import { PlusIcon } from 'lucide-react';

type ArrayFormWrapperProps = {
  children?: ReactNode;
  onCreate: VoidFunction;
  createButtonLabel?: string;
};

export const ArrayFormWrapper = ({
  children,
  onCreate,
  createButtonLabel = 'Add item',
}: ArrayFormWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
      <div>
        <Button onClick={onCreate} icon={<PlusIcon />} variant="ghost">
          {createButtonLabel}
        </Button>
      </div>
    </div>
  );
};

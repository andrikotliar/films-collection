import styles from './form-array-wrapper.module.css';
import { type PropsWithChildren } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '~/shared/components/button/button';

type FormArrayWrapperProps = {
  onCreate: VoidFunction;
  createButtonLabel?: string;
};

export const FormArrayWrapper = ({
  children,
  onCreate,
  createButtonLabel = 'Add item',
}: PropsWithChildren<FormArrayWrapperProps>) => {
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

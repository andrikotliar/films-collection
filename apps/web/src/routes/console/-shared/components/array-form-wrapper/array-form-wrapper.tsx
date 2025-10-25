import styles from './styles.module.css';
import { Button } from '~/common';
import { type PropsWithChildren, type ReactNode } from 'react';
import { PlusIcon } from 'lucide-react';

type Props = {
  children?: ReactNode;
  onCreate: VoidFunction;
  createButtonLabel?: string;
};

export const ArrayFormWrapper = ({
  children,
  onCreate,
  createButtonLabel = 'Add item',
}: PropsWithChildren<Props>) => {
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

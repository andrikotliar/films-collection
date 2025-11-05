import styles from './styles.module.css';
import { type PropsWithChildren } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '~/common/components/button/button';

type Props = {
  onCreate: VoidFunction;
  createButtonLabel?: string;
};

export const FormArrayWrapper = ({
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

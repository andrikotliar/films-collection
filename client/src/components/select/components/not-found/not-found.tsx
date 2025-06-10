import { Button } from '@/components/button/button';
import styles from './not-found.module.css';
import { PlusIcon } from 'lucide-react';

type NotFoundProps = {
  onCreate?: VoidFunction;
};

export const NotFound = ({ onCreate }: NotFoundProps) => {
  return (
    <div className={styles.notFoundOptions}>
      <div>Options not found</div>
      {typeof onCreate === 'function' && (
        <Button variant="ghost" icon={<PlusIcon />} onClick={onCreate}>
          Create new item
        </Button>
      )}
    </div>
  );
};

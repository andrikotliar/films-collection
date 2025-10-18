import styles from './create-new-item-button.module.css';
import { Button } from '~/components/button/button';
import { PlusIcon } from 'lucide-react';

type CreateNewItemBUttonProps = {
  onCreate: VoidFunction;
};

export const CreateNewItemButton = ({ onCreate }: CreateNewItemBUttonProps) => {
  return (
    <div className={styles.wrapper}>
      <Button variant="ghost" icon={<PlusIcon />} onClick={onCreate}>
        Create new item
      </Button>
    </div>
  );
};

import styles from './create-new-item-button.module.css';
import { Button } from '~/shared/components/button/button';
import { PlusIcon } from 'lucide-react';

type CreateNewItemButtonProps = {
  onCreate: VoidFunction;
};

export const CreateNewItemButton = ({ onCreate }: CreateNewItemButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <Button variant="ghost" icon={<PlusIcon />} onClick={onCreate}>
        Create new item
      </Button>
    </div>
  );
};

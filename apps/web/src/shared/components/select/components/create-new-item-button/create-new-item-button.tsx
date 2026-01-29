import styles from './create-new-item-button.module.css';
import { Button } from '~/shared/components/button/button';
import { SaveIcon } from 'lucide-react';

type CreateNewItemButtonProps = {
  onCreate: VoidFunction;
};

export const CreateNewItemButton = ({ onCreate }: CreateNewItemButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <Button variant="ghost" icon={<SaveIcon size={18} />} onClick={onCreate}>
        Save value
      </Button>
    </div>
  );
};

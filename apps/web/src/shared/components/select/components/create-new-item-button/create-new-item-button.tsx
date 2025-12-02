import styles from './styles.module.css';
import { Button } from '~/shared/components/button/button';
import { PlusIcon } from 'lucide-react';

type Props = {
  onCreate: VoidFunction;
};

export const CreateNewItemButton = ({ onCreate }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Button variant="ghost" icon={<PlusIcon />} onClick={onCreate}>
        Create new item
      </Button>
    </div>
  );
};

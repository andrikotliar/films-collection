import styles from './item-row.module.css';
import { Button } from '@/components';
import { DefaultListItem } from '@/routes/console/-types/default-list-item';
import { PencilIcon, Trash2Icon } from 'lucide-react';

export type ItemRowProps<T extends DefaultListItem> = {
  data: T;
  onDelete: (data: T) => void;
  onEdit: (data: T) => void;
  titleSelector?: keyof T;
};

export const ItemRow = <T extends DefaultListItem>({
  data,
  onDelete,
  onEdit,
  titleSelector = 'title',
}: ItemRowProps<T>) => {
  return (
    <div className={styles.row}>
      <div>{data[titleSelector]}</div>
      <div className={styles.tools}>
        <Button
          onClick={() => onEdit(data)}
          variant="ghost"
          icon={<PencilIcon />}
        />
        <Button
          onClick={() => onDelete(data)}
          variant="ghost"
          icon={<Trash2Icon />}
        />
      </div>
    </div>
  );
};

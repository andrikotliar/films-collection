import { type CollectionEventFilled } from '@/common';
import { Button, CollectionEventBanner } from '@/components';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import styles from './event.module.css';

type EventProps = {
  data: CollectionEventFilled;
  onDelete: (event: CollectionEventFilled) => void;
  onEdit: (event: CollectionEventFilled) => void;
};

export const Event = ({ data, onDelete, onEdit }: EventProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Button variant="ghost" icon={<PencilIcon />} onClick={() => onEdit(data)} />
        <Button variant="ghost" icon={<Trash2Icon />} onClick={() => onDelete(data)} />
      </div>
      <CollectionEventBanner data={data} />
    </div>
  );
};

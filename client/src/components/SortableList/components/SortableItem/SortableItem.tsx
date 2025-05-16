import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import styles from './SortableItem.module.css';

type SortableItemProps = PropsWithChildren<{
  id: UniqueIdentifier;
}>;

export const SortableItem: FC<SortableItemProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableItem}>
      <div className={styles.itemContent}>{children}</div>
      <div {...attributes} {...listeners} className={styles.handler}>
        <GripVerticalIcon />
      </div>
    </div>
  );
};

import { ReactNode } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';
import styles from './styles.module.css';

type SortableItemProps = {
  id: UniqueIdentifier;
  children?: ReactNode;
};

export const SortableItem = ({ children, id }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

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

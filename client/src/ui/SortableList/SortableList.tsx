import {
  closestCenter,
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './components';
import { ReactNode } from 'react';
import styles from './SortableList.module.css';

type ListItem = {
  id: UniqueIdentifier;
  [key: string]: unknown;
};

type ChildrenProps<T> = {
  item: T;
  index: number;
};

type SortableListProps<T extends ListItem> = {
  items: T[];
  children: (props: ChildrenProps<T>) => ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
};

export const SortableList = <T extends ListItem>({
  items,
  children,
  onDragEnd,
}: SortableListProps<T>) => {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className={styles.wrapper}>
          {items.map((item, index) => (
            <SortableItem key={item.id} id={item.id}>
              {children({ item, index })}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

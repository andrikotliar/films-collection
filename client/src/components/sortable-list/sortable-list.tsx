import {
  closestCenter,
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './components';
import { ReactNode } from 'react';

type ListItem = {
  id: UniqueIdentifier;
  [key: string]: unknown;
};

type SortableListProps<T extends ListItem> = {
  items: T[];
  children: ReactNode;
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
        {children}
      </SortableContext>
    </DndContext>
  );
};

SortableList.Item = SortableItem;

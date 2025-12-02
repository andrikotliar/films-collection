import { type PropsWithChildren } from 'react';
import { closestCenter, DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './components';

type ListItem = {
  id: UniqueIdentifier;
  [key: string]: unknown;
};

type SortableListProps<T extends ListItem> = PropsWithChildren<{
  items: T[];
  onDragEnd: (event: DragEndEvent) => void;
}>;

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

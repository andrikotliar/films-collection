import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ConfirmModal, Panel } from '~/common';
import { ItemRow, type ItemRowProps } from './item-row';
import { type DefaultListItem } from '~/routes/console/-common';
import { useState } from 'react';

type ListProps<T extends DefaultListItem> = {
  items: T[];
  isDeletingInProgress?: boolean;
  onDelete: UseMutateAsyncFunction<unknown, Error, number, unknown>;
} & Omit<ItemRowProps<T>, 'data' | 'onDelete'>;

export const List = <T extends DefaultListItem>({
  items,
  onDelete,
  isDeletingInProgress = false,
  ...props
}: ListProps<T>) => {
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const handleDeleteItem = async (data: T) => {
    await onDelete(data.id);
    setItemToDelete(null);
  };

  return (
    <Panel hasPaddings={false}>
      {items.map((item) => (
        <ItemRow key={item.id} data={item} onDelete={setItemToDelete} {...props} />
      ))}
      <ConfirmModal
        data={itemToDelete}
        onConfirm={handleDeleteItem}
        onClose={() => setItemToDelete(null)}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
        isPending={isDeletingInProgress}
      />
    </Panel>
  );
};

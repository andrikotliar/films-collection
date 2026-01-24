import { useState } from 'react';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ConfirmModal, Panel } from '~/shared';
import { type DefaultListItem } from '~/routes/console/-shared';
import { ItemRow, type ItemRowProps } from '~/routes/console/-shared/components/item-row/item-row';
import styles from './list.module.css';

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

  if (items.length === 0) {
    return <div className={styles.placeholder}>No items found</div>;
  }

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

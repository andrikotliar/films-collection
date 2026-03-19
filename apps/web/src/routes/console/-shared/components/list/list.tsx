import styles from './list.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { CameraLoader, ConfirmModal, Panel } from '~/shared';
import { type DefaultListItem } from '~/routes/console/-shared';
import { ItemRow, type ItemRowProps } from '~/routes/console/-shared/components/item-row/item-row';

type ListProps<T extends DefaultListItem> = {
  items: T[];
  isDeletingInProgress?: boolean;
  onDelete: UseMutateAsyncFunction<unknown, Error, number, unknown>;
  isFetching?: boolean;
} & Omit<ItemRowProps<T>, 'data' | 'onDelete'>;

export const List = <T extends DefaultListItem>({
  items,
  onDelete,
  isDeletingInProgress = false,
  isFetching = true,
  ...props
}: ListProps<T>) => {
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const handleDeleteItem = async (data: T) => {
    await onDelete(data.id);
    setItemToDelete(null);
  };

  if (isFetching) {
    return (
      <div className={clsx(styles.loader, styles.list_wrapper)}>
        <CameraLoader />
      </div>
    );
  }

  if (items.length === 0) {
    return <div className={clsx(styles.placeholder, styles.list_wrapper)}>No items found</div>;
  }

  return (
    <div className={styles.list_wrapper}>
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
    </div>
  );
};

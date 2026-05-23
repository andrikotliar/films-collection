import type { DefaultListItem } from '~/routes/console/-shared/types';
import styles from './list-content.module.css';
import { CameraLoader, ConfirmModal, Panel } from '~/shared';
import {
  ItemRow,
  type ItemRowProps,
} from '~/routes/console/-shared/components/list/components/item-row/item-row';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { GetDeleteMutationOptions } from '~/routes/console/-shared/components/list/types';

type ListContentProps<T extends DefaultListItem> = {
  list?: T[];
  isFetching: boolean;
  getDeleteMutationOptions: GetDeleteMutationOptions;
} & Omit<ItemRowProps<T>, 'data' | 'onDelete'>;

export const ListContent = <T extends DefaultListItem>({
  list,
  isFetching,
  getDeleteMutationOptions,
  ...props
}: ListContentProps<T>) => {
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const { mutateAsync: onDelete, isPending: isDeletingInProgress } = useMutation(
    getDeleteMutationOptions(),
  );

  const handleDeleteItem = async (data: T) => {
    await onDelete(data.id);
    setItemToDelete(null);
  };

  if (isFetching) {
    return (
      <Panel>
        <div className={styles.loader}>
          <CameraLoader />
        </div>
      </Panel>
    );
  }

  if (!list) {
    return <div className={styles.placeholder}>No items found</div>;
  }

  return (
    <Panel hasPaddings={false}>
      {list.length === 0 && <div className={styles.placeholder}>No items found</div>}
      {list.map((item) => (
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

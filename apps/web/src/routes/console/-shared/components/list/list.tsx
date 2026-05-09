import styles from './list.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { CameraLoader, ConfirmModal, Pagination, Panel } from '~/shared';
import { type DefaultListItem } from '~/routes/console/-shared';
import { ItemRow, type ItemRowProps } from '~/routes/console/-shared/components/item-row/item-row';
import type { FileRoutesByTo } from '~/routeTree.gen';
import { Link, useLocation } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { NEW_ITEM_ID, PAGE_LIMITS } from '@films-collection/shared';

type GetDeleteMutationOptions = () => UseMutationOptions<
  {
    id: number;
  },
  Error,
  number,
  unknown
>;

type ListProps<T extends DefaultListItem> = {
  data: {
    list: T[];
    total?: number;
    pageLimit?: number;
  };
  getDeleteMutationOptions: GetDeleteMutationOptions;
  isFetching?: boolean;
  createItemTitle?: string;
  onCreate?: VoidFunction;
  onPageChange?: (pageIndex: number) => void;
  onNavigateToForm?: keyof FileRoutesByTo;
} & Omit<ItemRowProps<T>, 'data' | 'onDelete'>;

export const List = <T extends DefaultListItem>({
  data,
  getDeleteMutationOptions,
  isFetching = true,
  onCreate,
  onNavigateToForm,
  createItemTitle = 'Create item',
  onPageChange,
  ...props
}: ListProps<T>) => {
  const location = useLocation();

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
      <div className={clsx(styles.loader, styles.list_wrapper)}>
        <CameraLoader />
      </div>
    );
  }
  const shouldShowHeader = !!onNavigateToForm || !!onCreate;

  return (
    <div className={styles.list_wrapper}>
      {shouldShowHeader && (
        <div className={styles.list_header}>
          {onNavigateToForm && (
            <Link
              className={styles.add_item_action}
              to={onNavigateToForm}
              params={{ id: NEW_ITEM_ID }}
            >
              <PlusIcon size={18} />
              <span>{createItemTitle}</span>
            </Link>
          )}
          {typeof onCreate === 'function' && (
            <button onClick={onCreate} className={styles.add_item_action}>
              <PlusIcon size={18} />
              <span>{createItemTitle}</span>
            </button>
          )}
        </div>
      )}
      <Panel hasPaddings={false}>
        {data.list.length === 0 && (
          <div className={clsx(styles.placeholder, styles.list_wrapper)}>No items found</div>
        )}
        {data.list.map((item) => (
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
      {typeof onPageChange === 'function' && (
        <div className={styles.pagination_wrapper}>
          <Pagination
            total={data.total ?? 0}
            perPageCounter={data.pageLimit ?? PAGE_LIMITS.default}
            onPageChange={onPageChange}
            currentPageIndex={location.search.pageIndex ?? 0}
          />
        </div>
      )}
    </div>
  );
};

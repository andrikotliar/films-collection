import styles from './list.module.css';
import { useState } from 'react';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import {
  CameraLoader,
  ConfirmModal,
  Pagination,
  Panel,
  SortingPopup,
  type SortingParams,
} from '~/shared';
import { type DefaultListItem } from '~/routes/console/-shared';
import { ItemRow, type ItemRowProps } from '~/routes/console/-shared/components/item-row/item-row';
import type { FileRoutesByTo } from '~/routeTree.gen';
import { Link, useLocation } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { NEW_ITEM_ID, PAGE_LIMITS, type ListOption } from '@films-collection/shared';
import { ListSearch } from '~/routes/console/-shared/components/list-search/list-search';

type GetDeleteMutationOptions = () => UseMutationOptions<
  {
    id: number;
  },
  Error,
  number,
  unknown
>;

type ListData<T extends DefaultListItem> = {
  list: T[];
  total?: number;
  pageLimit?: number;
};

type SortingProps = {
  apply: (params: SortingParams) => void;
  fields: ListOption<string>[];
};

type ListProps<T extends DefaultListItem> = {
  data: ListData<T> | undefined;
  getDeleteMutationOptions: GetDeleteMutationOptions;
  isFetching?: boolean;
  createItemTitle?: string;
  onCreate?: VoidFunction;
  onPageChange?: (pageIndex: number) => void;
  onSearch?: (value: string) => void;
  onNavigateToForm?: keyof FileRoutesByTo;
  sorting?: SortingProps;
} & Omit<ItemRowProps<T>, 'data' | 'onDelete'>;

export const List = <T extends DefaultListItem>({
  data,
  getDeleteMutationOptions,
  isFetching = true,
  onCreate,
  onNavigateToForm,
  createItemTitle = 'Create item',
  onPageChange,
  onSearch,
  sorting,
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
  const shouldShowHeader = !!onNavigateToForm || !!onCreate;

  return (
    <div className={styles.list_wrapper}>
      {sorting && (
        <div className={styles.sorting}>
          <SortingPopup
            fields={sorting.fields}
            onSorting={sorting.apply}
            defaultOrderKey={location.search.orderKey ?? sorting.fields[0].value}
            defaultOrder={location.search.order ?? 'desc'}
          />
        </div>
      )}
      {typeof onSearch === 'function' && <ListSearch onSearch={onSearch} />}
      <div>
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
          {isFetching && (
            <div className={styles.loader}>
              <CameraLoader />
            </div>
          )}
          {(!data || data?.list.length === 0) && (
            <div className={styles.placeholder}>No items found</div>
          )}
          {data?.list.map((item) => (
            <ItemRow key={item.id} data={item} onDelete={setItemToDelete} {...props} />
          ))}
        </Panel>
      </div>
      {typeof onPageChange === 'function' && (
        <div className={styles.pagination_wrapper}>
          <Pagination
            total={data?.total ?? 0}
            perPageCounter={data?.pageLimit ?? PAGE_LIMITS.default}
            onPageChange={onPageChange}
            currentPageIndex={location.search.pageIndex ?? 0}
          />
        </div>
      )}
      <ConfirmModal
        data={itemToDelete}
        onConfirm={handleDeleteItem}
        onClose={() => setItemToDelete(null)}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
        isPending={isDeletingInProgress}
      />
    </div>
  );
};

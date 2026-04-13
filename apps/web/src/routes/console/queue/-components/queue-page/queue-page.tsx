import { filmStatusOrder, PAGE_LIMITS, type Enum, type FilmStatus } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { SquareArrowRightIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import sanitize from 'sanitize-html';
import {
  AddItemButton,
  filmDefaultFormValues,
  List,
  useDeleteFilm,
  useFormModal,
} from '~/routes/console/-shared';
import type { AdditionalHandler } from '~/routes/console/-shared/components/item-row/item-row';
import { GenerateDescriptionForm } from '~/routes/console/queue/-components/generate-description-form/generate-description-form';
import { QueueFilters } from '~/routes/console/queue/-components/queue-filters/queue-filters';
import type { FileRouteTypes } from '~/routeTree.gen';
import {
  api,
  Button,
  getIncompleteFilmsListQueryOptions,
  Modal,
  Pagination,
  queryClient,
  TextInput,
  toaster,
  useDebouncedSearch,
  type ApiResponse,
} from '~/shared';
import styles from './queue-page.module.css';

type QueuePageProps = {
  status: Enum<typeof FilmStatus>;
  addItemTitle: string;
  pageRoute: Extract<
    FileRouteTypes['fullPaths'],
    '/console/queue/' | '/console/queue/planned' | '/console/queue/upcoming'
  >;
  shouldShowGenButton?: boolean;
};

const listHandlers: Array<
  AdditionalHandler<ApiResponse<typeof api.films.getAdminIncompleteFilmsList.exec>['list'][number]>
> = [
  {
    id: 'promote-status',
    icon: <SquareArrowRightIcon />,
    action: async (data) => {
      const curStatusIndex = filmStatusOrder.findIndex((status) => status === data.status);

      if (curStatusIndex === -1) {
        toaster.error(`Status ${data.status} is unknown`);
        return;
      }

      const nextStatus = filmStatusOrder[curStatusIndex + 1];

      if (!nextStatus) {
        toaster.error(`Next status after ${data.status} is not found`);
        return;
      }

      await api.films.update.exec({
        params: {
          id: data.id,
        },
        input: {
          status: nextStatus,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: [api.films.getAdminIncompleteFilmsList.staticKey],
      });
    },
  },
];

export const QueuePage = ({
  status,
  addItemTitle,
  pageRoute,
  shouldShowGenButton = false,
}: QueuePageProps) => {
  const navigate = useNavigate({ from: pageRoute });
  const search = useSearch({ from: pageRoute });

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const { data, isFetching } = useSuspenseQuery(
    getIncompleteFilmsListQueryOptions({
      ...search,
      status,
    }),
  );
  const { onOpen } = useFormModal();

  const { mutateAsync, isPending } = useDeleteFilm();

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (previous) => ({
        ...previous,
        pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex: 0,
        q: value,
      }),
    });
  });

  return (
    <>
      <div className={styles.buttons}>
        <AddItemButton onClick={() => onOpen(filmDefaultFormValues)}>{addItemTitle}</AddItemButton>
        {shouldShowGenButton && (
          <Button variant="secondary" onClick={() => setIsDescriptionModalOpen(true)}>
            Generate description
          </Button>
        )}
      </div>
      <TextInput
        placeholder="Search film"
        onChange={handleSearch}
        defaultValue={search.q ?? ''}
        icon={<SearchIcon />}
      />
      <QueueFilters pageRoute={pageRoute} />
      <List
        items={data.list}
        isFetching={isFetching}
        isDeletingInProgress={isPending}
        onDelete={mutateAsync}
        description={(data) =>
          data.overview ? sanitize(data.overview, { allowedTags: [] }) : null
        }
        onEdit={(values) => onOpen({ ...filmDefaultFormValues, ...values })}
        onCreate={(data) => {
          navigate({ to: '/console/films/$id', params: { id: data.id.toString() } });
        }}
        additionalHandlers={listHandlers}
      />
      <Pagination
        total={data.count}
        perPageCounter={PAGE_LIMITS.default}
        onPageChange={handlePageChange}
        currentPageIndex={search.pageIndex}
        totalLabel="films"
      />
      <Modal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        className={styles.modal}
      >
        <Modal.Content className={styles.content}>
          <GenerateDescriptionForm
            onAcceptDescription={(data) => {
              setIsDescriptionModalOpen(false);
              onOpen({
                ...filmDefaultFormValues,
                title: data.title,
                overview: data.text,
              });
            }}
          />
          <Modal.CloseButton
            onClick={() => setIsDescriptionModalOpen(false)}
            className={styles.close_button}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

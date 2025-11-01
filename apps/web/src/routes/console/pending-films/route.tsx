import { useState } from 'react';
import * as yup from 'yup';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  fetchPendingFilmsListQuery,
  NEW_ITEM_ID,
  PENDING_FILMS_PER_PAGE,
  Pagination,
  useDeletePendingFilm,
  type PendingFilm,
  type PendingFilmQueryFilters,
  type PendingFilmMutationPayload,
} from '~/common';
import { Filters, PendingFilmForm } from './-components';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { defaultPendingFilm } from '~/routes/console/pending-films/-configs';

const pendingFilmsFilterSchema = yup.object().shape({
  q: yup.string(),
  priority: yup.number().min(1).max(3),
  pageIndex: yup.number().min(0),
  orderKey: yup.string(),
  order: yup.string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/pending-films')({
  validateSearch: (search): PendingFilmQueryFilters => {
    return pendingFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(fetchPendingFilmsListQuery(deps.search));
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data } = useSuspenseQuery(fetchPendingFilmsListQuery(searchParams));

  const [pendingFilm, setPendingFilm] = useState<PendingFilmMutationPayload | null>(null);

  const { mutateAsync, isPending } = useDeletePendingFilm();

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  const handleCreate = (data: PendingFilm) => {
    navigate({
      to: '/console/films/$id',
      params: { id: NEW_ITEM_ID },
      search: {
        pendingFilmId: data.id.toString(),
      },
    });
  };

  return (
    <ConsoleContentLayout title="Pending films">
      <AddItemButton onClick={() => setPendingFilm(defaultPendingFilm)}>
        Create pending film
      </AddItemButton>
      <Filters />
      <List
        items={data.list}
        onDelete={mutateAsync}
        isDeletingInProgress={isPending}
        onCreate={handleCreate}
        onEdit={(data) =>
          setPendingFilm({
            ...data,
            priority: data.priority.toString(),
          })
        }
      />
      <Pagination
        currentPageIndex={searchParams.pageIndex}
        total={data.total}
        onPageChange={handlePageChange}
        perPageCounter={PENDING_FILMS_PER_PAGE}
        totalLabel="films"
      />
      <FormModal
        values={pendingFilm}
        afterSubmitEffect={() => setPendingFilm(null)}
        onClose={() => setPendingFilm(null)}
        form={PendingFilmForm}
      />
    </ConsoleContentLayout>
  );
}

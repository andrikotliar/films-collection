import {
  fetchPendingFilmsListQuery,
  NEW_ITEM_ID,
  PENDING_FILMS_PER_PAGE,
  type PendingFilm,
  type PendingFilmQueryFilters,
} from '@/common';
import { ConsoleContent, ConsoleTitle, Pagination } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { number, object, string } from 'yup';
import { Filters, PendingFilmForm } from './-components';
import { AddItemButton, FormModal, List } from '@/routes/console/-common';
import { useState } from 'react';
import type { PendingFilmMutationPayload } from '@/hooks';
import { defaultPendingFilm } from '@/routes/console/pending/-configs/default-pending-film';
import { useDeletePendingFilm } from '@/hooks/queries/use-delete-pending-film';

const pendingFilmsFilterSchema = object().shape({
  q: string(),
  priority: number().min(1).max(3),
  pageIndex: number().min(0),
  orderKey: string(),
  order: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/pending')({
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
    <ConsoleContent>
      <ConsoleTitle>Pending Films</ConsoleTitle>
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
    </ConsoleContent>
  );
}

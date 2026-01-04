import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  getPendingFilmsListQuery,
  Pagination,
  useDeletePendingFilm,
  useSuspensePendingFilmsList,
} from '~/shared';
import { Filters, PendingFilmForm } from './-components';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { defaultPendingFilm } from '~/routes/console/pending-films/-configs';
import { GetPendingFilmsListQuerySchema, NEW_ITEM_ID, PAGE_LIMITS } from '@films-collection/shared';
import type z from 'zod';
import type { PendingFilmFormSchema } from '~/routes/console/pending-films/-schemas';

export const Route = createFileRoute('/console/pending-films')({
  validateSearch: (search) => {
    return GetPendingFilmsListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(getPendingFilmsListQuery(deps.search));
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data } = useSuspensePendingFilmsList(searchParams);

  const [pendingFilm, setPendingFilm] = useState<z.infer<typeof PendingFilmFormSchema> | null>(
    null,
  );

  const { mutateAsync, isPending } = useDeletePendingFilm();

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  const handleCreate = (data: { id: number }) => {
    navigate({
      to: '/console/films/$id',
      params: { id: NEW_ITEM_ID },
      search: {
        pendingFilmId: data.id.toString(),
      },
    });
  };

  return (
    <ConsoleContentLayout title="Pending films" backPath="/console">
      <AddItemButton onClick={() => setPendingFilm(defaultPendingFilm)}>
        Create pending film
      </AddItemButton>
      <Filters />
      <List
        items={data.list}
        onDelete={mutateAsync}
        isDeletingInProgress={isPending}
        onCreate={handleCreate}
        onEdit={(data) => setPendingFilm(data)}
      />
      <Pagination
        currentPageIndex={searchParams.pageIndex}
        total={data.total}
        onPageChange={handlePageChange}
        perPageCounter={PAGE_LIMITS.default}
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

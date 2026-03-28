import { createFileRoute } from '@tanstack/react-router';
import {
  api,
  getEmptyFormValues,
  getPendingFilmsListQueryOptions,
  Pagination,
  type Input,
} from '~/shared';
import { Filters, PendingFilmForm } from './-components';
import {
  AddItemButton,
  ConsoleContentLayout,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { GetPendingFilmsListQuerySchema, NEW_ITEM_ID, PAGE_LIMITS } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

const defaultPendingFilm = getEmptyFormValues<Input<typeof api.pendingFilms.create.exec>>({
  title: '',
  priority: 1,
  collectionId: null,
  rating: null,
});

export const Route = createFileRoute('/console/pending-films')({
  validateSearch: (search) => {
    return GetPendingFilmsListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(getPendingFilmsListQueryOptions(deps.search));
  },
  component: withFormModal(PendingFilmForm, PageContainer),
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { onOpen } = useFormModal();

  const { data, isFetching } = useSuspenseQuery(getPendingFilmsListQueryOptions(searchParams));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: number) => api.pendingFilms.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: api.pendingFilms.getList.staticKey },
    },
  });

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
      <AddItemButton onClick={() => onOpen(defaultPendingFilm)}>Create pending film</AddItemButton>
      <Filters />
      <List
        items={data.list}
        onDelete={mutateAsync}
        isDeletingInProgress={isPending}
        onCreate={handleCreate}
        onEdit={onOpen}
        isFetching={isFetching}
      />
      <Pagination
        currentPageIndex={searchParams.pageIndex}
        total={data.total}
        onPageChange={handlePageChange}
        perPageCounter={PAGE_LIMITS.default}
        totalLabel="films"
      />
    </ConsoleContentLayout>
  );
}

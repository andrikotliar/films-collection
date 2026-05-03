import { GetIncompleteFilmsQuerySchema, PAGE_LIMITS } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  AddItemButton,
  ConsoleContentLayout,
  filmDefaultFormValues,
  List,
  useDeleteFilm,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { PartialFilmForm } from '~/routes/console/-shared/components/partial-film-form/partial-film-form';
import { getIncompleteFilmsListQueryOptions, Pagination } from '~/shared';

export const Route = createFileRoute('/console/pending-films')({
  validateSearch: (search) => GetIncompleteFilmsQuerySchema.parse(search),
  loaderDeps: (deps) => deps.search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      getIncompleteFilmsListQueryOptions({
        ...deps,
        status: 'PENDING',
      }),
    );
  },
  component: withFormModal(PartialFilmForm, RouteComponent),
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { onOpen } = useFormModal();
  const { data, isFetching } = useSuspenseQuery(
    getIncompleteFilmsListQueryOptions({
      ...search,
      status: 'PENDING',
    }),
  );

  const { mutateAsync: onDelete, isPending: isDeleting } = useDeleteFilm();

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  return (
    <ConsoleContentLayout title="Pending Films" backPath="/console">
      <AddItemButton onClick={() => onOpen({ ...filmDefaultFormValues, status: 'PENDING' })}>
        Add pending film
      </AddItemButton>
      <List
        items={data.list}
        onDelete={onDelete}
        isDeletingInProgress={isDeleting}
        isFetching={isFetching}
        onEdit={onOpen}
        onCreate={(item) => {
          navigate({
            to: '/console/films/$id',
            params: {
              id: item.id.toString(),
            },
          });
        }}
      />
      <Pagination
        onPageChange={handlePageChange}
        total={data.count}
        currentPageIndex={search.pageIndex}
        perPageCounter={PAGE_LIMITS.default}
        totalLabel="films"
      />
    </ConsoleContentLayout>
  );
}

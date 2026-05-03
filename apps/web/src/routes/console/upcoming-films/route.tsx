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
import { PartialFilmForm } from '~/routes/console/-shared/components';
import { getIncompleteFilmsListQueryOptions, Pagination } from '~/shared';

export const Route = createFileRoute('/console/upcoming-films')({
  validateSearch: (search) => GetIncompleteFilmsQuerySchema.parse(search),
  loaderDeps: (deps) => deps.search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      getIncompleteFilmsListQueryOptions({
        ...deps,
        status: 'UPCOMING',
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
      status: 'UPCOMING',
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
    <ConsoleContentLayout title="Upcoming Films" backPath="/console">
      <AddItemButton onClick={() => onOpen({ ...filmDefaultFormValues, status: 'UPCOMING' })}>
        Add upcoming film
      </AddItemButton>
      <List
        items={data.list}
        onDelete={onDelete}
        isDeletingInProgress={isDeleting}
        isFetching={isFetching}
        onEdit={onOpen}
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

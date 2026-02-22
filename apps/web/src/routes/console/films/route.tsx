import {
  useDocumentTitle,
  Pagination,
  getFilmsAdminListQueryOptions,
  api,
  queryKeys,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { AddItemLink, ConsoleContentLayout, List } from '~/routes/console/-shared';
import { AdminFilmsTools } from '~/routes/console/films/-components';
import { GetAdminListQuerySchema, NEW_ITEM_ID, PAGE_LIMITS } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/films')({
  validateSearch: (search) => {
    return GetAdminListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(getFilmsAdminListQueryOptions(deps.search));
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isFetching } = useSuspenseQuery(getFilmsAdminListQueryOptions(searchParams));

  const { mutateAsync: handleDeleteFilm, isPending } = useMutation({
    mutationFn: (id: number) => api.films.admin.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.films.admin.list()],
    },
  });

  useDocumentTitle('Admin list');

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleEditFilm = (data: { id: number }) => {
    navigate({
      to: '/console/films/$id',
      params: { id: data.id.toString() },
    });
  };

  const handleViewFilm = (data: { id: number }) => {
    navigate({
      to: '/films/$id',
      params: { id: data.id.toString() },
    });
  };

  return (
    <ConsoleContentLayout title="Films" backPath="/console">
      <AddItemLink to="/console/films/$id" params={{ id: NEW_ITEM_ID }}>
        Add new film
      </AddItemLink>
      <AdminFilmsTools />
      <List
        items={data.list}
        onDelete={handleDeleteFilm}
        onEdit={handleEditFilm}
        isDeletingInProgress={isPending}
        onView={handleViewFilm}
        isFetching={isFetching}
      />
      <Pagination
        total={data.total}
        perPageCounter={PAGE_LIMITS.default}
        onPageChange={handlePageChange}
        currentPageIndex={searchParams.pageIndex}
        totalLabel="films"
      />
    </ConsoleContentLayout>
  );
}

import { GetAdminListQuerySchema, PAGE_LIMITS } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { FilmCounter, FilmsGrid } from '~/routes/console/watchcounts/-components';
import { getFilmsAdminListQueryOptions, Pagination } from '~/shared';

export const Route = createFileRoute('/console/watchcounts')({
  component: RouteComponent,
  validateSearch: (search) => {
    return GetAdminListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(getFilmsAdminListQueryOptions(deps.search));
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(getFilmsAdminListQueryOptions(searchParams));

  const handlePageIndexChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  return (
    <ConsoleContentLayout title="Films watch count" backPath="/console">
      <FilmsGrid>
        {data.films.map((film) => (
          <FilmCounter data={film} key={film.id} />
        ))}
      </FilmsGrid>
      <Pagination
        total={data.total}
        currentPageIndex={searchParams.pageIndex}
        perPageCounter={PAGE_LIMITS.default}
        onPageChange={handlePageIndexChange}
      />
    </ConsoleContentLayout>
  );
}

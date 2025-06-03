import { FILMS_ADMIN_LIST_PER_PAGE, NEW_ITEM_ID } from '@/constants';
import { useDocumentTitle } from '@/hooks';
import { fetchAdminListQuery } from '@/queries';
import { AdminFilmsQueryFilters } from '@/types';
import { ConsoleContent, ConsoleTitle, Panel, Pagination } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { number, object, string } from 'yup';
import { AdminFilm, AdminFilmsGrid, AdminFilmsTools } from './-components';
import { AddItemLink } from '@/routes/console/-components';

const adminFilmsFilterSchema = object().shape({
  q: string(),
  pageIndex: number().min(0),
  sortingField: string(),
  sortingDirection: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/manage')({
  validateSearch: (search): AdminFilmsQueryFilters => {
    return adminFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchAdminListQuery(deps.search),
    );
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(fetchAdminListQuery(searchParams));

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

  return (
    <ConsoleContent>
      <ConsoleTitle>Manage films</ConsoleTitle>
      <AdminFilmsTools />
      <AddItemLink to="/console/manage/$id" params={{ id: NEW_ITEM_ID }}>
        Add new film
      </AddItemLink>
      <Panel>
        <AdminFilmsGrid>
          {data.films.map((film) => (
            <AdminFilm film={film} key={film.id} />
          ))}
        </AdminFilmsGrid>
      </Panel>
      <Pagination
        total={data.total}
        perPageCounter={FILMS_ADMIN_LIST_PER_PAGE}
        onPageChange={handlePageChange}
        currentPageIndex={searchParams.pageIndex}
        totalLabel="films"
      />
    </ConsoleContent>
  );
}

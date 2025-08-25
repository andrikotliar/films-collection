import {
  FILMS_ADMIN_LIST_PER_PAGE,
  NEW_ITEM_ID,
  fetchAdminListQuery,
  type AdminFilmsQueryFilters,
  type FilmsAdminListItem,
} from '@/common';
import { useDeleteFilm, useDocumentTitle } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContent, ConsoleTitle, Pagination } from '@/components';
import { number, object, string } from 'yup';
import { AddItemLink, List } from '@/routes/console/-common';
import { AdminFilmsTools } from '@/routes/console/films/-components';

const adminFilmsFilterSchema = object().shape({
  q: string().nullable(),
  pageIndex: number().min(0),
  sortingField: string(),
  sortingDirection: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/films')({
  validateSearch: (search): AdminFilmsQueryFilters => {
    return adminFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(fetchAdminListQuery(deps.search));
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(fetchAdminListQuery(searchParams));

  const { mutateAsync: handleDeleteFilm, isPending } = useDeleteFilm();

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

  const handleEditFilm = (data: FilmsAdminListItem) => {
    navigate({
      to: '/console/films/$id',
      params: { id: data.id.toString() },
    });
  };

  const handleViewFilm = (data: FilmsAdminListItem) => {
    navigate({
      to: '/film/$id',
      params: { id: data.id.toString() },
    });
  };

  return (
    <ConsoleContent>
      <ConsoleTitle>Films</ConsoleTitle>
      <AddItemLink to="/console/films/$id" params={{ id: NEW_ITEM_ID }}>
        Add new film
      </AddItemLink>
      <AdminFilmsTools />
      <List
        items={data.films}
        onDelete={handleDeleteFilm}
        onEdit={handleEditFilm}
        isDeletingInProgress={isPending}
        onView={handleViewFilm}
      />
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

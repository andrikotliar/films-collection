import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAdminListQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';
import { Island, Pagination, ConsoleContentLayout, ConsoleTitle } from '@/ui';
import { AddFilmLink, AdminFilm, AdminFilmsTools } from './components';
import { FILMS_ADMIN_LIST_PER_PAGE } from '@/constants';
import { useDocumentTitle } from '@/hooks';

const routeApi = getRouteApi('/console/manage');

export const ConsoleAdminFilmsPage = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
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
    <ConsoleContentLayout>
      <ConsoleTitle>Manage films</ConsoleTitle>
      <AdminFilmsTools />
      <AddFilmLink />
      <Island hasPaddings={false}>
        {data.films.map((film) => (
          <AdminFilm film={film} key={film.id} />
        ))}
      </Island>
      <Pagination
        total={data.total}
        perPageCounter={FILMS_ADMIN_LIST_PER_PAGE}
        onPageChange={handlePageChange}
        currentPageIndex={searchParams.pageIndex}
      />
    </ConsoleContentLayout>
  );
};

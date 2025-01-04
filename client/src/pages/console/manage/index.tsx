import { useSuspenseQuery } from '@tanstack/react-query';
import { ConsoleContentLayout, ConsoleTitle } from '../components';
import { fetchAdminListQuery } from '@/queries';
import { getRouteApi, Link } from '@tanstack/react-router';
import { Island, Pagination } from '@/components';
import { AddFilmLink, AdminFilm, Tools } from './components';
import { FILMS_ADMIN_LIST_PER_PAGE } from '@/constants';

const routeApi = getRouteApi('/console/manage');

export const ConsoleManageFilmsPage = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data } = useSuspenseQuery(fetchAdminListQuery(searchParams));

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
      <Tools />
      <AddFilmLink />
      <Island displayPadding={false}>
        {data.films.map((film) => (
          <AdminFilm film={film} key={film._id} />
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

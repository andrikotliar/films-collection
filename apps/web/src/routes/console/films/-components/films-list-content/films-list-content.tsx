import { PAGE_LIMITS } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { List } from '~/routes/console/-shared';
import { AdminFilmsTools } from '~/routes/console/films/-components/admin-films-tools/admin-films-tools';
import {
  api,
  FiltersSidebar,
  filterValues,
  getFilmsAdminListQueryOptions,
  getFiltersConfig,
  getInitialDataQueryOptions,
  Pagination,
} from '~/shared';
import styles from './films-list-content.module.css';
import { useMemo, useState } from 'react';

const routeApi = getRouteApi('/console/films');

export const FilmsListContent = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data, isFetching } = useSuspenseQuery(getFilmsAdminListQueryOptions(searchParams));
  const { data: initialData, isFetching: isInitialDataFetching } = useSuspenseQuery(
    getInitialDataQueryOptions(),
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { mutateAsync: handleDeleteFilm, isPending } = useMutation({
    mutationFn: (id: number) => api.films.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: api.films.getAdminList.staticKey },
    },
  });

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

  const filterFilms: React.ComponentProps<typeof FiltersSidebar>['onSubmit'] = (data) => {
    const appliedFilters = filterValues(data);

    navigate({
      search: () => ({
        ...appliedFilters,
        pageIndex: 0,
      }),
    });
    setIsSidebarOpen(false);
  };

  const handleReset = () => {
    navigate({
      to: '/console/films',
      search: {
        pageIndex: 0,
      },
    });
    window.scrollTo(0, 0);
    setIsSidebarOpen(false);
  };

  const filtersConfig = useMemo(() => {
    return getFiltersConfig(initialData);
  }, [initialData]);

  return (
    <div className={styles.content}>
      <FiltersSidebar
        isLoading={isInitialDataFetching}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSubmit={filterFilms}
        onReset={handleReset}
        defaultValues={searchParams}
        config={filtersConfig}
        height="calc(var(--screen-height) - 190px)"
        topPosition="calc(var(--header-height) + 60px)"
      />
      <div className={styles.right_column}>
        <AdminFilmsTools onFilterOpen={() => setIsSidebarOpen(true)} />
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
          perPageCounter={PAGE_LIMITS.filmsList}
          onPageChange={handlePageChange}
          currentPageIndex={searchParams.pageIndex}
          totalLabel="films"
        />
      </div>
    </div>
  );
};

import { PAGE_LIMITS } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { filmDefaultFormValues, List } from '~/routes/console/-shared';
import { AdminFilmsTools } from '~/routes/console/films/-components/admin-films-tools/admin-films-tools';
import {
  api,
  countObjectKeys,
  Filters,
  FiltersSidebar,
  filterValues,
  getFilmsAdminListQueryOptions,
  getInitialDataQueryOptions,
  Pagination,
  useSidebarVisibility,
} from '~/shared';
import styles from './films-list-content.module.css';
import { useMemo } from 'react';
import { FiltersSchema, getFiltersConfig } from '~/routes/_home/-helpers';

const routeApi = getRouteApi('/console/films');

export const FilmsListContent = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data, isFetching } = useSuspenseQuery(getFilmsAdminListQueryOptions(searchParams));
  const { data: initialData, isFetching: isInitialDataFetching } = useSuspenseQuery(
    getInitialDataQueryOptions(),
  );

  const { isFilterOpen, toggleFilter, hideFilter } = useSidebarVisibility();

  const { mutateAsync: handleDeleteFilm, isPending } = useMutation({
    mutationFn: (id: number) => api.films.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [{ queryKey: api.films.getAdminList.staticKey }],
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

  const filterFilms: React.ComponentProps<typeof Filters>['onSubmit'] = (data) => {
    const appliedFilters = filterValues(data);

    navigate({
      search: () => ({
        ...appliedFilters,
        pageIndex: 0,
      }),
    });
    hideFilter();
  };

  const handleReset = () => {
    navigate({
      to: '/console/films',
      search: {
        pageIndex: 0,
      },
    });
    window.scrollTo(0, 0);
    hideFilter();
  };

  const filtersConfig = useMemo(() => {
    return getFiltersConfig(initialData);
  }, [initialData]);

  const initialFilters = useMemo(() => {
    return {
      ...filmDefaultFormValues,
      ...searchParams,
    };
  }, [searchParams]);

  const filtersCount = countObjectKeys(searchParams, ['pageIndex']);

  return (
    <div className={styles.content}>
      <FiltersSidebar
        isLoading={isInitialDataFetching}
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
        height="calc(var(--screen-height) - 80px)"
        topPosition="calc(var(--header-height) + 60px)"
        filtersCount={filtersCount}
      >
        <Filters
          config={filtersConfig}
          defaultValues={initialFilters}
          onSubmit={filterFilms}
          schema={FiltersSchema}
          filtersCount={filtersCount}
          onReset={(reset) => {
            reset(filmDefaultFormValues);
            handleReset();
          }}
        />
      </FiltersSidebar>
      <div className={styles.right_column}>
        <AdminFilmsTools />
        <List
          items={data.list}
          onDelete={handleDeleteFilm}
          onEdit={handleEditFilm}
          isDeletingInProgress={isPending}
          onView={handleViewFilm}
          isFetching={isFetching}
          viewActionAvailable={(item) => !item.draft}
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

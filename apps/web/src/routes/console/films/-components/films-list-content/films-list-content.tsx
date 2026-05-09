import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { List } from '~/routes/console/-shared';
import { AdminFilmsTools } from '~/routes/console/films/-components/admin-films-tools/admin-films-tools';
import {
  api,
  countObjectKeys,
  Filters,
  FiltersSidebar,
  filterValues,
  getFilmsAdminListQueryOptions,
  getInitialDataQueryOptions,
  useSidebarVisibility,
} from '~/shared';
import styles from './films-list-content.module.css';
import { useMemo } from 'react';
import {
  AdminFiltersSchema,
  defaultAdminFilters,
  getAdminFiltersConfig,
} from '~/routes/console/films/-helpers';

const routeApi = getRouteApi('/console/films');

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.films.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [{ queryKey: api.films.getAdminList.staticKey }],
    },
  });
};

export const FilmsListContent = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data, isFetching } = useSuspenseQuery(getFilmsAdminListQueryOptions(searchParams));
  const { data: initialData, isFetching: isInitialDataFetching } = useSuspenseQuery(
    getInitialDataQueryOptions(),
  );

  const { isFilterOpen, toggleFilter, hideFilter } = useSidebarVisibility();

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
    return getAdminFiltersConfig(initialData);
  }, [initialData]);

  const initialFilters = useMemo(() => {
    return {
      ...defaultAdminFilters,
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
        height="calc(var(--screen-height) - 100px)"
        topPosition="calc(var(--header-height) + 80px)"
        filtersCount={filtersCount}
      >
        <Filters
          config={filtersConfig}
          defaultValues={initialFilters}
          resetValues={defaultAdminFilters}
          onSubmit={filterFilms}
          schema={AdminFiltersSchema}
          filtersCount={filtersCount}
          onReset={handleReset}
        />
      </FiltersSidebar>
      <div className={styles.right_column}>
        <AdminFilmsTools />
        <List
          data={data}
          getDeleteMutationOptions={getDeleteMutationOptions}
          onEdit={handleEditFilm}
          onView={handleViewFilm}
          isFetching={isFetching}
          viewActionAvailable={(item) => !item.draft}
          onNavigateToForm="/console/films/$id"
          createItemTitle="New film"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

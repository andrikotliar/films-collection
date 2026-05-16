import {
  Filters,
  useDocumentTitle,
  getFilmsAdminListQueryOptions,
  getInitialDataQueryOptions,
  useScrollToTop,
  useSidebarVisibility,
  filterValues,
  countObjectKeys,
  api,
  FiltersSidebar,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { GetAdminListQuerySchema } from '@films-collection/shared';
import { mutationOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  AdminFiltersSchema,
  defaultAdminFilters,
  getAdminFiltersConfig,
} from '~/routes/console/films/-helpers';
import { Column, ContentWithSidebar, List } from '~/routes/console/-shared';
import { AdminFilmsTools } from '~/routes/console/films/-components';

export const Route = createFileRoute('/console/films')({
  validateSearch: (search) => {
    return GetAdminListQuerySchema.parse(search);
  },
  loader: async ({ context, location }) => {
    await context.queryClient.ensureQueryData(getFilmsAdminListQueryOptions(location.search));
    await context.queryClient.ensureQueryData(getInitialDataQueryOptions());
  },
  component: PageContainer,
  staticData: {
    title: 'Films',
    backPath: '/console',
  },
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.films.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [{ queryKey: api.films.getAdminList.staticKey }],
    },
  });
};

function PageContainer() {
  useDocumentTitle('Admin list');
  useScrollToTop([]);

  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isFetching } = useQuery(getFilmsAdminListQueryOptions(searchParams));
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
    <ContentWithSidebar>
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
      <Column>
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
      </Column>
    </ContentWithSidebar>
  );
}

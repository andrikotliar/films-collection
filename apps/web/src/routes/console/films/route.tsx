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
  type SortingParams,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { GetAdminListQuerySchema, type ListOption } from '@films-collection/shared';
import { mutationOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import {
  AdminFiltersSchema,
  defaultAdminFilters,
  getAdminFiltersConfig,
} from '~/routes/console/films/-helpers';
import { ContentWithSidebar, List } from '~/routes/console/-shared';

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

const sortingFields: ListOption<string>[] = [
  {
    label: 'Updated At',
    value: 'updatedAt',
  },
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Title',
    value: 'title',
  },
];

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

  const handleSearch = useCallback((value: string) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex: 0,
        q: value,
      }),
    });
  }, []);

  const handleApplySorting = useCallback((sorting: SortingParams) => {
    navigate({
      search: (params) => ({
        ...params,
        ...sorting,
      }),
    });
  }, []);

  return (
    <ContentWithSidebar>
      <FiltersSidebar
        isLoading={isInitialDataFetching}
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
        heightReducer="100px"
        topPositionMargin="80px"
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
      <List
        data={data}
        getDeleteMutationOptions={getDeleteMutationOptions}
        onEdit={handleEditFilm}
        onView={handleViewFilm}
        onSearch={handleSearch}
        isFetching={isFetching}
        viewActionAvailable={(item) => !item.draft}
        onNavigateToForm="/console/films/$id"
        createItemTitle="New film"
        onPageChange={handlePageChange}
        sorting={{
          fields: sortingFields,
          apply: handleApplySorting,
        }}
      />
    </ContentWithSidebar>
  );
}

import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { GetFilmsListQuerySchema } from '@films-collection/shared';
import {
  countObjectKeys,
  Filters,
  FiltersSidebar,
  filterValues,
  getFilmsListQueryOptions,
  getFilmsStatsQueryOptions,
  getInitialDataQueryOptions,
  useSidebarVisibility,
} from '~/shared';
import { FilmsSection, RootPageLayout } from './-components';
import { filterDefaultValues, FiltersSchema, getFiltersConfig } from '~/routes/_home/-helpers';

export const Route = createFileRoute('/_home/')({
  validateSearch: (search) => {
    return GetFilmsListQuerySchema.parse(search);
  },
  loader: async ({ context, location }) => {
    const { filmId: _, ...search } = location.search as Record<string, any>;
    return await context.queryClient.ensureQueryData(getFilmsListQueryOptions(search));
  },
  component: RootPageContainer,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Films Collection (${loaderData?.allFilmsCount} films)`,
      },
    ],
  }),
});

function RootPageContainer() {
  const routeSearch = Route.useSearch();
  const navigate = Route.useNavigate();
  const { isFilterOpen, hideFilter, toggleFilter } = useSidebarVisibility();

  const { data: initialData, isFetching: isInitialDataLoading } = useSuspenseQuery(
    getInitialDataQueryOptions(),
  );

  const { data: stats } = useQuery(getFilmsStatsQueryOptions());

  const filtersConfig = useMemo(() => {
    if (!initialData) {
      return [];
    }

    return getFiltersConfig(initialData, stats);
  }, [initialData, stats]);

  const submitFilter: React.ComponentProps<typeof Filters>['onSubmit'] = (data) => {
    const filledOptions = filterValues(data);
    navigate({
      search: (prev) => ({
        ...prev,
        ...filledOptions,
        pageIndex: 0,
      }),
    });
    hideFilter();
  };

  const handleReset = () => {
    navigate({
      to: '/',
    });
    hideFilter();
  };

  const initialFilters = useMemo(() => {
    return {
      ...filterDefaultValues,
      ...routeSearch,
    };
  }, [routeSearch]);

  const filtersCount = countObjectKeys(routeSearch, ['pageIndex', 'filmId']);

  return (
    <RootPageLayout>
      <FiltersSidebar
        filtersCount={filtersCount}
        isLoading={isInitialDataLoading}
        heightReducer="40px"
        topPositionMargin="20px"
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
      >
        <Filters
          defaultValues={initialFilters}
          resetValues={filterDefaultValues}
          onSubmit={submitFilter}
          schema={FiltersSchema}
          onReset={handleReset}
          filtersCount={filtersCount}
          config={filtersConfig}
        />
      </FiltersSidebar>
      <FilmsSection />
    </RootPageLayout>
  );
}

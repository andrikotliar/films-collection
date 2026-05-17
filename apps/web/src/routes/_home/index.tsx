import type z from 'zod';
import { Suspense, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GetFilmsListQuerySchema } from '@films-collection/shared';
import {
  CameraLoader,
  countObjectKeys,
  Filters,
  FiltersSidebar,
  filterValues,
  getFilmsListQueryOptions,
  getInitialDataQueryOptions,
  useDocumentTitle,
  useSidebarVisibility,
} from '~/shared';
import { FilmsSection, RootPageLayout } from './-components';
import { filterDefaultValues, FiltersSchema, getFiltersConfig } from '~/routes/_home/-helpers';

export const Route = createFileRoute('/_home/')({
  validateSearch: (search: z.infer<typeof GetFilmsListQuerySchema>) => {
    return GetFilmsListQuerySchema.parse(search);
  },
  loader: async ({ context, location }) => {
    await context.queryClient.ensureQueryData(getFilmsListQueryOptions(location.search));
  },
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  const routeSearch = Route.useSearch();
  const navigate = Route.useNavigate();
  const { isFilterOpen, hideFilter, toggleFilter } = useSidebarVisibility();

  const { data: initialData, isFetching: isInitialDataLoading } = useSuspenseQuery(
    getInitialDataQueryOptions(),
  );

  const filtersConfig = useMemo(() => {
    if (!initialData) {
      return [];
    }

    return getFiltersConfig(initialData);
  }, [initialData]);

  const submitFilter: React.ComponentProps<typeof Filters>['onSubmit'] = (data) => {
    const filledOptions = filterValues(data);
    navigate({
      search: (prev) => ({
        ...prev,
        ...filledOptions,
        pageIndex: 0,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    hideFilter();
  };

  const handleReset = () => {
    navigate({
      to: '/',
    });
    window.scrollTo(0, 0);
    hideFilter();
  };

  const initialFilters = useMemo(() => {
    return {
      ...filterDefaultValues,
      ...routeSearch,
    };
  }, [routeSearch]);

  const filtersCount = countObjectKeys(routeSearch, ['pageIndex']);

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
      <Suspense fallback={<CameraLoader />}>
        <FilmsSection />
      </Suspense>
    </RootPageLayout>
  );
}

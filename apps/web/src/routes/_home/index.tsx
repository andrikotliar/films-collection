import type z from 'zod';
import { Suspense, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GetFilmsListQuerySchema } from '@films-collection/shared';
import {
  CameraLoader,
  FiltersSidebar,
  filterValues,
  getFilmsListQueryOptions,
  getFiltersConfig,
  getInitialDataQueryOptions,
  useDocumentTitle,
  useSidebarVisibility,
  type Filters,
} from '~/shared';
import { FilmsSection, RootPageLayout } from './-components';

export const Route = createFileRoute('/_home/')({
  validateSearch: (search: z.infer<typeof GetFilmsListQuerySchema>) => {
    return GetFilmsListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(getFilmsListQueryOptions(deps.search));
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

  return (
    <RootPageLayout>
      <FiltersSidebar
        config={filtersConfig}
        defaultValues={routeSearch}
        isLoading={isInitialDataLoading}
        onSubmit={submitFilter}
        onReset={handleReset}
        height="calc(var(--screen-height) - 40px)"
        topPosition="calc(var(--header-height) + 20px)"
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
      />
      <Suspense fallback={<CameraLoader />}>
        <FilmsSection />
      </Suspense>
    </RootPageLayout>
  );
}

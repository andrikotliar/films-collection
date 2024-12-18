import { Sidebar, FilmsSection, RootPageLayout } from './components';
import { useDocumentTitle } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchFilmsListQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Loader } from '@/components';

const routeApi = getRouteApi('/');

export const RootPage = () => {
  useDocumentTitle();

  const routeSearch = routeApi.useSearch();

  const { data, isFetching } = useSuspenseQuery(
    fetchFilmsListQuery(routeSearch),
  );

  return (
    <RootPageLayout>
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <FilmsSection data={data} isLoading={isFetching} />
      </Suspense>
    </RootPageLayout>
  );
};

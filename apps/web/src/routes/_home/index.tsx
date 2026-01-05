import type z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GetFilmsListQuerySchema } from '@films-collection/shared';
import { getFilmsListQueryOptions, getInitialDataQueryOptions, useDocumentTitle } from '~/shared';
import { FilmsSection, RootPageLayout, Sidebar } from './-components';

export const Route = createFileRoute('/_home/')({
  validateSearch: (search: z.infer<typeof GetFilmsListQuerySchema>) => {
    return GetFilmsListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(getInitialDataQueryOptions());
    await context.queryClient.ensureQueryData(getFilmsListQueryOptions(deps.search));
  },
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  const routeSearch = Route.useSearch();

  const { data, isFetching } = useSuspenseQuery(getFilmsListQueryOptions(routeSearch));

  return (
    <RootPageLayout>
      <Sidebar />
      <FilmsSection data={data} isLoading={isFetching} />
    </RootPageLayout>
  );
}

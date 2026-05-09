import {
  useDocumentTitle,
  getFilmsAdminListQueryOptions,
  getInitialDataQueryOptions,
  useScrollToTop,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';

import { GetAdminListQuerySchema } from '@films-collection/shared';
import { FilmsListContent } from '~/routes/console/films/-components';

export const Route = createFileRoute('/console/films')({
  validateSearch: (search) => {
    return GetAdminListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(getFilmsAdminListQueryOptions(deps.search));
    await context.queryClient.ensureQueryData(getInitialDataQueryOptions());
  },
  component: PageContainer,
  staticData: {
    title: 'Films',
    backPath: '/console',
  },
});

function PageContainer() {
  useDocumentTitle('Admin list');
  useScrollToTop([]);

  return <FilmsListContent />;
}

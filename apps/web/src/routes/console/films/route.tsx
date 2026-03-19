import {
  useDocumentTitle,
  getFilmsAdminListQueryOptions,
  getInitialDataQueryOptions,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { GetFilmsListQuerySchema } from '@films-collection/shared';
import { FilmsListContent } from '~/routes/console/films/-components';

export const Route = createFileRoute('/console/films')({
  validateSearch: (search) => {
    return GetFilmsListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(getFilmsAdminListQueryOptions(deps.search));
    await context.queryClient.ensureQueryData(getInitialDataQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  useDocumentTitle('Admin list');

  return (
    <ConsoleContentLayout title="Films" backPath="/console" isFullWidth>
      <FilmsListContent />
    </ConsoleContentLayout>
  );
}

import { ConsoleAdminFilmsPage } from '@/pages';
import { fetchAdminListQuery } from '@/queries';
import { AdminFilmsQueryFilters } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { number, object, string } from 'yup';

const adminFilmsFilterSchema = object().shape({
  q: string(),
  pageIndex: number().min(0),
  sortingField: string(),
  sortingDirection: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/manage')({
  validateSearch: (search): AdminFilmsQueryFilters => {
    return adminFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchAdminListQuery(deps.search),
    );
  },
  component: ConsoleAdminFilmsPage,
});

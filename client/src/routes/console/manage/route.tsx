import { fetchAdminListQuery } from '@/queries';
import { ManageFilmsQueryFilters } from '@/types/manage-films-filters';
import { createFileRoute } from '@tanstack/react-router';
import { number, object, string } from 'yup';

const manageFilmsFilterSchema = object().shape({
  q: string(),
  pageIndex: number().min(0),
  sortingField: string(),
  sortingDirection: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/manage')({
  validateSearch: (search): ManageFilmsQueryFilters => {
    return manageFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchAdminListQuery(deps.search),
    );
  },
});

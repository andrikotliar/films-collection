import { fetchPendingFilmsListQuery } from '@/queries';
import { PendingFilmQueryFilters } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { number, object, string } from 'yup';

const pendingFilmsFilterSchema = object().shape({
  q: string(),
  priority: number().min(1).max(3),
  pageIndex: number().min(0),
  orderKey: string(),
  order: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/pending')({
  validateSearch: (search): PendingFilmQueryFilters => {
    return pendingFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchPendingFilmsListQuery(deps.search),
    );
  },
});

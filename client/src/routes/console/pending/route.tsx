import { fetchPendingFilmsListQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/pending')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchPendingFilmsListQuery());
  },
});

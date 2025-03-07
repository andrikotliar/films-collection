import { fetchCollectionEventsQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/collection-events')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});

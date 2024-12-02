import { fetchFilmQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';

const Route = createFileRoute('/film/$filmId')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(fetchFilmQuery(params.filmId));
  },
});

export { Route };

import { fetchFilmQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$filmId')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(fetchFilmQuery(params.filmId));
  },
});

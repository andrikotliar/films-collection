import { FilmPage } from '@/pages';
import { fetchFilmQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(fetchFilmQuery(params.id));
  },
  component: FilmPage,
});

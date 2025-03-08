import { ConsoleFilm } from '@/pages';
import { fetchInitialDataQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';
import { object, string } from 'yup';

const consoleFilmQueriesSchema = object({
  title: string(),
});

export const Route = createFileRoute('/console/manage_/$id')({
  validateSearch: (search) => {
    return consoleFilmQueriesSchema.validateSync(search);
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchInitialDataQuery());
  },
  component: ConsoleFilm,
});

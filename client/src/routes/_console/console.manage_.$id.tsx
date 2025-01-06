import { ConsoleFilm } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { object, string } from 'yup';

const consoleFilmQueriesSchema = object({
  title: string(),
});

export const Route = createFileRoute('/_console/console/manage_/$id')({
  validateSearch: (search) => {
    return consoleFilmQueriesSchema.validateSync(search);
  },
  component: ConsoleFilm,
});

import { ConsoleFilm } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_console/console/manage_/$id')({
  component: ConsoleFilm,
});

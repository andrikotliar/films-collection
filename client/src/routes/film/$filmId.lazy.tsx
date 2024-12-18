import { FilmPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/film/$filmId')({
  component: FilmPage,
});

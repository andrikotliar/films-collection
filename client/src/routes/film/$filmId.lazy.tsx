import { FilmPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

const Route = createLazyFileRoute('/film/$filmId')({
  component: FilmPage,
});

export { Route };

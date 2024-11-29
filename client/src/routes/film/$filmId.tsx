import { FilmPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

const Route = createFileRoute('/film/$filmId')({
  component: () => <FilmPageComponent />,
});

const FilmPageComponent = () => {
  const { filmId } = Route.useParams();

  return <FilmPage id={filmId} />;
};

export { Route };

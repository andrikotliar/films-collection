import { Description } from '~/routes/films/-components';
import { useFilm } from '~/routes/films/-hooks/use-film';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/overview')({
  component: RouteContainer,
});

function RouteContainer() {
  const film = useFilm();

  if (!film.description) {
    return <Navigate to="/film/$id" params={{ id: film.id.toString() }} />;
  }

  return <Description rawHtml={film.description} />;
}

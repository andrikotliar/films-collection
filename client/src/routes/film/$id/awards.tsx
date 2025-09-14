import { Awards } from '@/routes/film/-components';
import { useFilm } from '@/routes/film/-hooks/use-film';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/awards')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  if (!film.awards.length) {
    return <Navigate to="/film/$id" params={{ id: film.id.toString() }} />;
  }

  return <Awards awards={film.awards} />;
}

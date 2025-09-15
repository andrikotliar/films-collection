import { Chapters } from '@/routes/film/-components';
import { useFilm } from '@/routes/film/-hooks/use-film';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/chapters')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  if (!film.chapters?.length) {
    return <Navigate to="/film/$id" params={{ id: film.id.toString() }} />;
  }

  return <Chapters data={film.chapters} filmId={film.id} />;
}

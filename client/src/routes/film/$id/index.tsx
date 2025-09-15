import { CrewCastList } from '@/routes/film/-components';
import { useFilm } from '@/routes/film/-hooks/use-film';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  if (!film.castAndCrew?.length) {
    return null;
  }

  return <CrewCastList people={film.castAndCrew} />;
}

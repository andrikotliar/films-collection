import { CrewCastList } from '@/routes/film/-components';
import { useFilm } from '@/routes/film/-hooks/use-film';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const film = useFilm();

  return <CrewCastList people={film.castAndCrew} />;
}

import { Description } from '@/routes/film/-components';
import { useFilm } from '@/routes/film/-hooks/use-film';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id/overview')({
  component: RouteContainer,
});

function RouteContainer() {
  const film = useFilm();

  if (!film.description) {
    return <div>{film.title} doesn't have overview</div>;
  }

  return <Description rawHtml={film.description} />;
}

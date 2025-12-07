import { createFileRoute } from '@tanstack/react-router';
import { Chapters } from '~/routes/films/$id/-components';
import { useFilm } from '~/routes/films/$id/-hooks';

export const Route = createFileRoute('/films/$id/related')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: film } = useFilm();

  if (!film.chapters) {
    return <div>Film doesn't have related titles</div>;
  }

  return (
    <div>
      <Chapters data={film.chapters} filmId={film.id} />
    </div>
  );
}

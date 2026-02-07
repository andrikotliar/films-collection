import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Chapters } from '~/routes/films/$id/-components';
import { getFilmQueryOptions } from '~/shared';

export const Route = createFileRoute('/films/$id/related')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: film } = useSuspenseQuery(getFilmQueryOptions(+params.id));

  if (!film.chapters) {
    return <div>Film doesn't have related titles</div>;
  }

  return <Chapters data={film.chapters} filmId={film.id} />;
}

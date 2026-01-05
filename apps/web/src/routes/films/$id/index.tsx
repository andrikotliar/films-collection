import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Awards, CastAndCrew, ContentLayout, Description } from '~/routes/films/$id/-components';
import { Stats } from '~/routes/films/$id/-components/stats/stats';
import { getFilmQueryOptions } from '~/shared';

export const Route = createFileRoute('/films/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: film } = useSuspenseQuery(getFilmQueryOptions(+params.id));
  return (
    <ContentLayout>
      {film.awards.length > 0 && <Awards data={film.awards} />}
      {film.description && <Description rawHtml={film.description} />}
      <Stats watchCount={film.watchCount} rating={film.rating} />
      {film.castAndCrew.length !== 0 && <CastAndCrew data={film.castAndCrew} />}
    </ContentLayout>
  );
}

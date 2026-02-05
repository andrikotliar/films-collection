import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Awards, CastAndCrew, ContentLayout, Description } from '~/routes/films/$id/-components';
import { getFilmQueryOptions } from '~/shared';

export const Route = createFileRoute('/films/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: film } = useSuspenseQuery(getFilmQueryOptions(+params.id));

  const isEmptyPage =
    !film.description && film.awards.length === 0 && film.castAndCrew.length === 0;

  return (
    <ContentLayout>
      {film.description && <Description rawHtml={film.description} />}
      {film.awards.length > 0 && <Awards data={film.awards} />}
      {film.castAndCrew.length !== 0 && <CastAndCrew data={film.castAndCrew} />}
      {isEmptyPage && <div>No information here yet</div>}
    </ContentLayout>
  );
}

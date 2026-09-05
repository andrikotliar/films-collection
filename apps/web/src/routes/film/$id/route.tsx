import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  Awards,
  CastAndCrew,
  Description,
  FilmPageLayout,
  NavigationRow,
  SummarySection,
} from '~/routes/film/$id/-components';
import { getFilmQueryOptions } from '~/shared';

export const Route = createFileRoute('/film/$id')({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(getFilmQueryOptions(Number(params.id)));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: film } = useSuspenseQuery(getFilmQueryOptions(Number(params.id)));

  return (
    <FilmPageLayout>
      <NavigationRow />
      <SummarySection film={film} />
      {film.synopsis && <Description value={film.synopsis} />}
      {film.castAndCrew.length !== 0 && <CastAndCrew data={film.castAndCrew} />}
      {film.awards.length > 0 && <Awards data={film.awards} />}
    </FilmPageLayout>
  );
}

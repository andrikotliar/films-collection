import { createFileRoute } from '@tanstack/react-router';
import { CameraLoader, getFilmQueryOptions } from '~/shared';
import {
  Awards,
  CastAndCrew,
  ContentLayout,
  FilmPageLayout,
  NavigationRow,
  SummarySection,
} from '~/routes/films/$id/-components';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/films/$id')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(getFilmQueryOptions(Number(params.id)));
  },
  component: FilmPageContainer,
  pendingComponent: () => <CameraLoader isFullPage />,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title} - Films Collection` }],
  }),
});

function FilmPageContainer() {
  const { id } = Route.useParams();
  const { data: film } = useSuspenseQuery(getFilmQueryOptions(Number(id)));

  const hasExtendedData = film.awards.length !== 0 || film.castAndCrew.length !== 0;

  return (
    <FilmPageLayout>
      <NavigationRow />
      <SummarySection film={film} hasExtendedData={hasExtendedData} />
      <ContentLayout>
        {film.awards.length > 0 && <Awards data={film.awards} />}
        {film.castAndCrew.length !== 0 && <CastAndCrew data={film.castAndCrew} />}
      </ContentLayout>
    </FilmPageLayout>
  );
}

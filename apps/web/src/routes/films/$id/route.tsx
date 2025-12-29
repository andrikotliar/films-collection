import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getFilmQueryOptions, useDocumentTitle, useScrollToTop } from '~/shared';
import {
  FilmDetailsTabs,
  FilmPageLayout,
  NavigationRow,
  SummarySection,
  TabWrapper,
} from '~/routes/films/$id/-components';

export const Route = createFileRoute('/films/$id')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(getFilmQueryOptions(Number(params.id)));
  },
  component: FilmPageContainer,
});

function FilmPageContainer() {
  const { id } = Route.useParams();
  const film = Route.useLoaderData();

  useScrollToTop([id]);
  useDocumentTitle(film.title);

  return (
    <FilmPageLayout>
      <NavigationRow />
      <SummarySection film={film} />
      <FilmDetailsTabs
        config={[
          {
            title: 'Overview',
            route: '/films/$id',
          },
          {
            title: 'Related films',
            route: '/films/$id/related',
            isVisible: !!film.chapters?.length,
          },
        ]}
        filmId={film.id}
      />
      <TabWrapper>
        <Outlet />
      </TabWrapper>
    </FilmPageLayout>
  );
}

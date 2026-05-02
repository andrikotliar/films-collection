import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  CountsBlock,
  CurrentEvents,
  FilmsBanner,
  Layout,
  PlannedFilmsWidget,
  PostersBlock,
  Row,
  UpcomingFilmsWidget,
} from '~/routes/_home/-components';
import { FormModalProvider } from '~/routes/console/-shared';
import { PartialFilmForm } from '~/routes/console/queue/-components';
import {
  getAuthStateQueryOptions,
  getDashboardQueryOptions,
  PageTitle,
  useDocumentTitle,
} from '~/shared';

export const Route = createFileRoute('/_home/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getAuthStateQueryOptions()).catch(() => {
      return {
        isAuthenticated: false,
      };
    });

    await context.queryClient.ensureQueryData(getDashboardQueryOptions());
  },
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  const { data } = useSuspenseQuery(getDashboardQueryOptions());

  return (
    <Layout>
      <PageTitle>Dashboard</PageTitle>
      <CurrentEvents events={data.events} />
      <Row>
        <FilmsBanner count={data.filmsCount} />
        <FormModalProvider form={PartialFilmForm}>
          <PlannedFilmsWidget items={data.plannedFilms} />
        </FormModalProvider>
        <CountsBlock
          items={data.genresCount}
          title="Genres"
          getSearch={(item) => ({
            genreIds: [item.id],
          })}
        />
        <CountsBlock
          items={data.collectionsCount}
          title="Collections"
          getSearch={(item) => ({
            collectionId: item.id,
          })}
        />
      </Row>
      <PostersBlock items={data.latestAddedFilms} title="New films in the list" />
      <UpcomingFilmsWidget items={data.upcomingFilms} />
    </Layout>
  );
}

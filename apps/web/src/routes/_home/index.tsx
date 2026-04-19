import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  CurrentEvents,
  FilmsBanner,
  Layout,
  PostersBlock,
  Row,
  UpcomingFilmsWidget,
} from '~/routes/_home/-components';
import { getDashboardQueryOptions, useDocumentTitle } from '~/shared';

export const Route = createFileRoute('/_home/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getDashboardQueryOptions());
  },
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  const { data } = useSuspenseQuery(getDashboardQueryOptions());

  return (
    <Layout>
      <CurrentEvents events={data.events} />
      <Row>
        <FilmsBanner />
        <PostersBlock items={data.latestAddedFilms} title="New films in the list" />
      </Row>
      <UpcomingFilmsWidget items={data.upcomingFilms} />
    </Layout>
  );
}

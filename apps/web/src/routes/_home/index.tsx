import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  CurrentEvents,
  FilmsBanner,
  Layout,
  Row,
  UpcomingFilmsWidget,
} from '~/routes/_home/-components';
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
      </Row>
      <UpcomingFilmsWidget items={data.upcomingFilms} />
    </Layout>
  );
}

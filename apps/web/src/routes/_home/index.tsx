import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  CurrentEvents,
  FilmsBanner,
  Layout,
  Main,
  PostersBlock,
  UpcomingFilmsWidget,
} from '~/routes/_home/-components';
import { getDashboardQueryOptions, getPluralWord, PageTitle, useDocumentTitle } from '~/shared';

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
      <PageTitle>Dashboard</PageTitle>
      <CurrentEvents events={data.events} />
      <Main>
        <FilmsBanner />
        <UpcomingFilmsWidget items={data.upcomingFilms} />
        <PostersBlock items={data.latestAddedFilms} title="New films in the list" />
        <PostersBlock
          items={data.releasedToday}
          title="Released in this day"
          description={(item) => `${item.yearsCount} ${getPluralWord('year', item.yearsCount)} ago`}
        />
      </Main>
    </Layout>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { CurrentEvents, FilmsBanner, Layout, Row } from '~/routes/_home/-components';
import { getInitialDataQueryOptions, useDocumentTitle } from '~/shared';

export const Route = createFileRoute('/_home/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getInitialDataQueryOptions());
  },
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  return (
    <Layout>
      <CurrentEvents />
      <Row>
        <FilmsBanner />
      </Row>
    </Layout>
  );
}

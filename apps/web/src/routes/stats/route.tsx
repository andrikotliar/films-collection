import { createFileRoute } from '@tanstack/react-router';
import { StatsLayout } from '~/routes/stats/-components/stats-layout/stats-layout';
import { getFilmsStatsQueryOptions, PageTitle } from '~/shared';

export const Route = createFileRoute('/stats')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getFilmsStatsQueryOptions());
  },
  head: () => ({
    meta: [{ title: 'Statistic - Films Collection' }],
  }),
});

function RouteComponent() {
  return (
    <StatsLayout>
      <PageTitle>Statistic</PageTitle>
    </StatsLayout>
  );
}

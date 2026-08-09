import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { StatsLayout } from '~/routes/stats/-components/stats-layout/stats-layout';
import { getFilmsStatsQueryOptions, PageTitle } from '~/shared';
import { Chart } from '~/shared/components/chart/chart';

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
  const { data } = useSuspenseQuery(getFilmsStatsQueryOptions());

  return (
    <StatsLayout>
      <PageTitle>Statistic</PageTitle>
      {data.map((chart) => (
        <Chart
          key={chart.block}
          label={chart.block}
          xAxisMaxValue={227}
          xAxisStep={20}
          data={chart.stats}
        />
      ))}
    </StatsLayout>
  );
}

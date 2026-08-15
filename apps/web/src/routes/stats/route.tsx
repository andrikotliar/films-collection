import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ChartsGrid } from '~/routes/stats/-components/charts-grid/charts-grid';
import { StatsLayout } from '~/routes/stats/-components/stats-layout/stats-layout';
import { getFilmsStatsQueryOptions, PageTitle } from '~/shared';
import { DonutChart } from '~/shared/components/donut-chart/donut-chart';

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
      <ChartsGrid>
        {data.stats.map((category) => (
          <DonutChart
            data={category.stats}
            title={category.block}
            total={data.filmsTotal}
            key={category.block}
          />
        ))}
      </ChartsGrid>
    </StatsLayout>
  );
}

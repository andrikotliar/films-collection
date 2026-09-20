import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Navigation } from '~/routes/_home/-components/films-section/components';
import { ChartsGrid } from '~/routes/films/stats/-components/charts-grid/charts-grid';
import { StatsLayout } from '~/routes/films/stats/-components/stats-layout/stats-layout';
import { getFilmsStatsQueryOptions } from '~/shared';
import { DonutChart } from '~/shared/components/donut-chart/donut-chart';

export const Route = createFileRoute('/films/stats')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getFilmsStatsQueryOptions());
  },
  head: () => ({
    meta: [{ title: 'Films Statistic - Films Collection' }],
  }),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(getFilmsStatsQueryOptions());

  return (
    <StatsLayout>
      <Navigation />
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

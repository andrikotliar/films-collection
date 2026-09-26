// import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Navigation } from '~/routes/_home/-components/films-section/components';
import { ChartsGrid } from '~/routes/films/stats/-components/charts-grid/charts-grid';
import { StatsLayout } from '~/routes/films/stats/-components/stats-layout/stats-layout';
import { getFilmsStatsQueryOptions } from '~/shared';
import { Chart } from '@tanstack/charts/react/tooltip';
import { getChartsConfig } from '~/routes/films/stats/-configs/charts-config';

export const Route = createFileRoute('/films/stats')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getFilmsStatsQueryOptions());
  },
  head: () => ({
    meta: [{ title: 'Films Statistic - Films Collection' }],
  }),
});

const { countries } = getChartsConfig();

function RouteComponent() {
  // const { data } = useSuspenseQuery(getFilmsStatsQueryOptions());

  return (
    <StatsLayout>
      <Navigation />
      <ChartsGrid>
        <Chart definition={countries} height={480} ariaLabel="Test" />
      </ChartsGrid>
    </StatsLayout>
  );
}

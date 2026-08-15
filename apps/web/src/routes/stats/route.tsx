import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { ChartsGrid } from '~/routes/stats/-components/charts-grid/charts-grid';
import { StatsLayout } from '~/routes/stats/-components/stats-layout/stats-layout';
import { getFilmsStatsQueryOptions, PageTitle } from '~/shared';
import { Chart } from '~/shared/components/chart/chart';
import { type Colors } from '~/shared/configs/css-colors';

export const Route = createFileRoute('/stats')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getFilmsStatsQueryOptions());
  },
  head: () => ({
    meta: [{ title: 'Statistic - Films Collection' }],
  }),
});

const blockToColor: Record<string, { bg: Colors; text: Colors }> = {
  types: {
    bg: 'colorGreenPrimary',
    text: 'colorBlack',
  },
  styles: {
    bg: 'colorBlueGreenPrimary',
    text: 'colorBlack',
  },
  genres: {
    bg: 'colorPurpleLight',
    text: 'colorBlack',
  },
  collections: {
    bg: 'colorRedLight',
    text: 'colorBlack',
  },
  studios: {
    bg: 'colorOrangeLight',
    text: 'colorBlack',
  },
  countries: {
    bg: 'colorBrownLight',
    text: 'colorBlack',
  },
};

function RouteComponent() {
  const { data } = useSuspenseQuery(getFilmsStatsQueryOptions());

  const mappedData = useMemo(() => {
    return data.stats.map((block) => ({
      ...block,
      colorConfig: blockToColor[block.block],
    }));
  }, [data]);

  return (
    <StatsLayout>
      <PageTitle>Statistic</PageTitle>
      <ChartsGrid>
        {mappedData.map((chart) => (
          <Chart
            key={chart.block}
            label={chart.block}
            xAxisMaxValue={227}
            xAxisStep={30}
            bgColor={chart.colorConfig.bg}
            textColor={chart.colorConfig.text}
            data={chart.stats}
          />
        ))}
      </ChartsGrid>
    </StatsLayout>
  );
}

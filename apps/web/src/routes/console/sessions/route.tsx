import { createFileRoute } from '@tanstack/react-router';
import { Sessions } from '~/routes/console/sessions/-components';
import { buildMetaTitle, buildGetUserSessionsQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/sessions')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(buildGetUserSessionsQueryOptions());
  },
  component: Sessions,
  staticData: {
    title: 'Sessions',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: buildMetaTitle('Sessions'),
      },
    ],
  }),
});

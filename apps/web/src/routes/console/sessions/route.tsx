import { createFileRoute } from '@tanstack/react-router';

import { Sessions } from '~/routes/console/sessions/-components';
import { getUserSessionsQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/sessions')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getUserSessionsQueryOptions());
  },
  component: RouteComponent,
  staticData: {
    title: 'Sessions',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: 'Sessions - Films Collection',
      },
    ],
  }),
});

function RouteComponent() {
  return <Sessions />;
}

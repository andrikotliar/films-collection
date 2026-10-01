import { createFileRoute } from '@tanstack/react-router';

import { RootMenu } from '~/routes/console/_root/-components';
import { buildMetaTitle, buildGetAuthStateQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/_root/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.fetchQuery(buildGetAuthStateQueryOptions());
  },
  component: RouteComponent,
  staticData: {
    title: 'Console',
  },
  head: () => ({
    meta: [
      {
        title: buildMetaTitle('Console'),
      },
    ],
  }),
});

function RouteComponent() {
  return <RootMenu />;
}

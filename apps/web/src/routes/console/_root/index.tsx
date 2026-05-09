import { createFileRoute } from '@tanstack/react-router';

import { RootMenu } from '~/routes/console/_root/-components';
import { getAuthStateQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/_root/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAuthStateQueryOptions());
  },
  component: RouteComponent,
  staticData: {
    title: 'Console',
  },
});

function RouteComponent() {
  return (
    <div>
      <RootMenu />
    </div>
  );
}

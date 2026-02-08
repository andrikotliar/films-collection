import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { RootMenu } from '~/routes/console/_root/-components';
import { getAuthStateQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/_root/')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAuthStateQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConsoleContentLayout title="Console">
      <RootMenu />
    </ConsoleContentLayout>
  );
}

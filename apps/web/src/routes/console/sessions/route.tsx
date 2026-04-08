import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { Sessions } from '~/routes/console/sessions/-components';
import { getUserSessionsQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/sessions')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getUserSessionsQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConsoleContentLayout title="Sessions" backPath="/console">
      <Sessions />
    </ConsoleContentLayout>
  );
}

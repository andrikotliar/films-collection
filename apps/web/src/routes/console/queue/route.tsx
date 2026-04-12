import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { QueueNavigation } from '~/routes/console/queue/-components';

export const Route = createFileRoute('/console/queue')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConsoleContentLayout title="Films Queue" backPath="/console">
      <QueueNavigation />
      <Outlet />
    </ConsoleContentLayout>
  );
}

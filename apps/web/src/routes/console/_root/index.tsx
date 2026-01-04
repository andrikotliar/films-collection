import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { RootMenu } from '~/routes/console/_root/-components';

export const Route = createFileRoute('/console/_root/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConsoleContentLayout title="Console">
      <RootMenu />
    </ConsoleContentLayout>
  );
}

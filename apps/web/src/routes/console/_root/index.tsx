import { createFileRoute } from '@tanstack/react-router';
import { ConsoleTitle } from '~/routes/console/-shared/components/console-content-layout/components';
import { RootMenu } from '~/routes/console/_root/-components';

export const Route = createFileRoute('/console/_root/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ConsoleTitle>Console</ConsoleTitle>
      <RootMenu />
    </div>
  );
}

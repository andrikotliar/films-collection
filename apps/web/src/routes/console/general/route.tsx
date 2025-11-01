import { GeneralPagesMenu } from '~/routes/console/general/-components';
import { createFileRoute } from '@tanstack/react-router';
import { ConsoleContentLayout } from '~/routes/console/-shared';

export const Route = createFileRoute('/console/general')({
  component: PageContainer,
});

function PageContainer() {
  return (
    <ConsoleContentLayout title="General data">
      <GeneralPagesMenu />
    </ConsoleContentLayout>
  );
}

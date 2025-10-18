import { ConsoleContent, ConsoleTitle } from '~/common';
import { GeneralPagesMenu } from '~/routes/console/general/-components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/general')({
  component: PageContainer,
});

function PageContainer() {
  return (
    <ConsoleContent>
      <ConsoleTitle>General data</ConsoleTitle>
      <GeneralPagesMenu />
    </ConsoleContent>
  );
}

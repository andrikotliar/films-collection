import { NotFound } from '~/shared';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/statistic')({
  component: PageContainer,
});

function PageContainer() {
  return <NotFound title="Statistics" message="Page is under construction" />;
}

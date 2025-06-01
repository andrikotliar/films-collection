import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/general_/awards_/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/console/general_/awards_/$id"!</div>;
}

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/film/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/film/$id"!</div>;
}

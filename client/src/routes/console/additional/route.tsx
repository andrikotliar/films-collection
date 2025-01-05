import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/additional')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Page is under construction</div>;
}

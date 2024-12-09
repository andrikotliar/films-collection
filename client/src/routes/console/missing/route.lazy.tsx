import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/console/missing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Missing</div>
}

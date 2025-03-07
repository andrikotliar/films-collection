import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/console/manage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}

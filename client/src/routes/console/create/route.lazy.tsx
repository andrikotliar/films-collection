import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/console/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}
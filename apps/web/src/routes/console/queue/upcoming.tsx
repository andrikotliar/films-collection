import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/queue/upcoming')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/queue/upcoming"!</div>
}

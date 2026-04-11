import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/queue/planned')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/queue/pending"!</div>
}

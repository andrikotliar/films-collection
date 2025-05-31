import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/general_/awards')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/general_/awards"!</div>
}

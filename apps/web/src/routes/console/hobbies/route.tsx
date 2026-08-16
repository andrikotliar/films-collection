import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/hobbies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/hobbies"!</div>
}

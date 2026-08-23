import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/hobbies_/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/hobbies_/$id"!</div>
}

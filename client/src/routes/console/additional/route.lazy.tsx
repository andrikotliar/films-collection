import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/console/additional')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}

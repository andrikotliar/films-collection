import { NotFound } from '@/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_console/console/additional')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotFound title="Lists" message="Page is under construction" />
}

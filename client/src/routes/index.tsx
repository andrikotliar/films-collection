import { RootPage } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

const Route = createFileRoute('/')({
  component: RootPage,
})

export { Route }

import { ConsolePage } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/console')({
  component: () => <ConsolePage />,
})

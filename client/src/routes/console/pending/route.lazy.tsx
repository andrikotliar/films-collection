import { ConsolePendingFilmsPage } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/console/pending')({
  component: ConsolePendingFilmsPage,
})

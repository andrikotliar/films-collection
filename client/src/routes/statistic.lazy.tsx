import { StatisticPage } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

const Route = createLazyFileRoute('/statistic')({
  component: () => <StatisticPage />,
})

export { Route }

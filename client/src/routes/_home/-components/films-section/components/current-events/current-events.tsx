import { fetchInitialDataQuery } from '@/common';
import { useQuery } from '@tanstack/react-query';
import { DashboardSection } from '@/components';
import { EventsList } from '@/routes/_home/-components/films-section/components/events-list/events-list';

export const CurrentEvents = () => {
  const { data: initialData } = useQuery(fetchInitialDataQuery());

  if (!initialData?.events.length) {
    return null;
  }

  return (
    <DashboardSection title="Current events">
      <EventsList items={initialData.events} />
    </DashboardSection>
  );
};

import { BREAKPOINTS, fetchInitialDataQuery } from '~/common';
import { useQuery } from '@tanstack/react-query';
import { EventBanner } from '~/routes/_home/-components/event-banner/event-banner';

const getPlaceholdersCount = (eventsCount: number) => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= BREAKPOINTS.xl2) {
    return 4 - eventsCount;
  }

  if (screenWidth >= BREAKPOINTS.xl) {
    return eventsCount % 2;
  }

  return 0;
};

export const CurrentEvents = () => {
  const { data: initialData } = useQuery(fetchInitialDataQuery());

  if (!initialData?.events.length) {
    return null;
  }

  const placeholdersCount = getPlaceholdersCount(initialData.events.length);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-5">
      {initialData.events.map((event) => (
        <EventBanner event={event} key={event.id} />
      ))}
      {placeholdersCount > 0 &&
        Array.from({ length: placeholdersCount }, (_, index) => (
          <div className="bg-slate-100 rounded-md border border-slate-200" key={index} />
        ))}
    </div>
  );
};

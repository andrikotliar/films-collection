import { fetchInitialDataQuery } from '@/common';
import { useQuery } from '@tanstack/react-query';

export const CurrentEvents = () => {
  const { data: initialData } = useQuery(fetchInitialDataQuery());

  if (!initialData?.events.length) {
    return null;
  }

  return null;
};

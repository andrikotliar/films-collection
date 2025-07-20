import { fetchInitialDataQuery } from '@/common';
import { useQuery } from '@tanstack/react-query';

export const useLogoDecoration = () => {
  const { data } = useQuery(fetchInitialDataQuery());

  if (!data) {
    return null;
  }

  return data.event;
};

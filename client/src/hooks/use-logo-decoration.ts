import { getLogoDecorationConfig } from '@/configs';
import { buildMediaPath } from '@/helpers';
import { useMemo } from 'react';

type DecorationEvent = {
  image: string;
  title: string;
};

export const useLogoDecoration = () => {
  return useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const events = getLogoDecorationConfig(currentYear);

    let decorationEvent: DecorationEvent | null = null;

    for (const event of events) {
      const fromDate = new Date(event.date.from);
      const toDate = new Date(event.date.to);

      if (currentDate >= fromDate && currentDate <= toDate) {
        decorationEvent = {
          image: buildMediaPath(event.image),
          title: event.title,
        };
        break;
      }
    }

    return decorationEvent;
  }, []);
};

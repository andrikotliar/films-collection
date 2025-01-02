import { useMemo } from 'react';
import { logoDecorationConfig, LogoDecorationDate } from '@/configs';
import { buildMediaPath } from '@/helpers';

type DecorationEvent = {
  image: string;
  title: string;
};

const convertDateToNumber = ([month, day]: LogoDecorationDate) => {
  return month * 100 + day;
};

const getIsDateBetween = (
  currentDate: number,
  startDate: number,
  endDate: number,
) => {
  if (startDate <= endDate) {
    return currentDate >= startDate && currentDate <= endDate;
  }

  return currentDate >= startDate || currentDate <= endDate;
};

export const useLogoDecoration = () => {
  return useMemo(() => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;

    const events = logoDecorationConfig.filter((event) => {
      return event.date.from[0] === month || event.date.to[0] === month;
    });

    if (!events.length) {
      return null;
    }

    let decorationEvent: DecorationEvent | null = null;

    const currentDate = convertDateToNumber([month, date]);

    for (const event of events) {
      const startDate = convertDateToNumber(event.date.from);
      const endDate = convertDateToNumber(event.date.to);

      const isDateBetween = getIsDateBetween(currentDate, startDate, endDate);

      if (isDateBetween) {
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

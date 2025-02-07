import { AppliedFilter } from '../types';
import { getFormattedDate, getFormattedMoneyValue } from '@/helpers';

export const getBadgeLabel = (filter: AppliedFilter) => {
  if (filter.key === 'duration') {
    return `${filter.value} min`;
  }

  if (filter.key === 'startDate') {
    return `Date from: ${getFormattedDate(filter.value as string)}`;
  }

  if (filter.key === 'endDate') {
    return `Date to: ${getFormattedDate(filter.value as string)}`;
  }

  if (filter.key === 'episodesTotal') {
    return `Episodes Total: ${filter.value}`;
  }

  if (filter.key === 'seasonsTotal') {
    return `Seasons Total: ${filter.value}`;
  }

  if (filter.key === 'budget') {
    return `Budget: ${getFormattedMoneyValue(Number(filter.value))}`;
  }

  if (filter.key === 'boxOffice') {
    return `Box Office: ${getFormattedMoneyValue(Number(filter.value))}`;
  }

  if (filter.key === 'rating') {
    return `Rating: ${filter.value}`;
  }

  return filter.value;
};

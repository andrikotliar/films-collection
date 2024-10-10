import { combinedTitles } from '@/titles/combined-titles';
import { AppliedFilter } from '../types';
import { getFormattedDate } from '@/helpers';

const getBadgeLabel = (filter: AppliedFilter) => {
  if (filter.key === 'duration') {
    return `${filter.value} min`;
  }

  if (filter.key === 'startDate') {
    return `Date from: ${getFormattedDate(new Date(filter.value))}`;
  }

  if (filter.key === 'endDate') {
    return `Date to: ${getFormattedDate(new Date(filter.value))}`;
  }

  if (combinedTitles[filter.value]) {
    return combinedTitles[filter.value];
  }

  return filter.value;
};

export { getBadgeLabel };

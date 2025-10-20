import type { Film } from '~/common';

export type Tab = {
  route: string;
  title: string;
  condition?: keyof Film;
};

export const filmTabsConfig: Tab[] = [
  {
    title: 'Details',
    route: '/film/$id',
  },
  {
    title: 'Chapters',
    route: '/film/$id/chapters',
    condition: 'chapters',
  },
];

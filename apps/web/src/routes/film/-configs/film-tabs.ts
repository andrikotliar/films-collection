import type { Film } from '@/common';

export type Tab = {
  route: string;
  title: string;
  condition: keyof Film;
};

export const filmTabsConfig: Tab[] = [
  {
    title: 'Crew and Cast',
    route: '/film/$id',
    condition: 'castAndCrew',
  },
  {
    title: 'Overview',
    route: '/film/$id/overview',
    condition: 'description',
  },
  {
    title: 'Awards',
    route: '/film/$id/awards',
    condition: 'awards',
  },
  {
    title: 'Chapters',
    route: '/film/$id/chapters',
    condition: 'chapters',
  },
];

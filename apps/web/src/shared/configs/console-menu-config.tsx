import { type MenuConfigItem } from '../types';
import {
  BuildingIcon,
  CalendarClockIcon,
  CalendarIcon,
  ClapperboardIcon,
  ClockIcon,
  KeyRoundIcon,
  LibraryIcon,
  MapIcon,
  NewspaperIcon,
  TrophyIcon,
  UserCogIcon,
  UserIcon,
  VideotapeIcon,
} from 'lucide-react';
import { DraftLevel } from '@films-collection/shared';

export const consoleMenuConfig: Record<string, MenuConfigItem> = {
  films: {
    id: 'films',
    route: '/console/films',
    title: 'Films',
    icon: <ClapperboardIcon />,
    color: 'color-blue-primary',
  },
  pendingFilms: {
    id: 'pendingFilms',
    route: '/console/films',
    search: {
      draftLevels: [DraftLevel.PENDING],
      order: 'asc' as const,
      orderKey: 'createdAt',
    },
    title: 'Pending Films',
    shortTitle: 'Pending',
    icon: <CalendarClockIcon />,
    color: 'color-orange-primary',
  },
  upcomingFilms: {
    id: 'upcomingFilms',
    route: '/console/films',
    title: 'Upcoming Films',
    shortTitle: 'Upcoming',
    search: {
      draftLevels: [DraftLevel.UPCOMING],
    },
    icon: <ClockIcon />,
    color: 'color-brown-light',
  },
  collectionEvents: {
    id: 'collection-events',
    route: '/console/collection-events',
    title: 'Collection Events',
    shortTitle: 'Events',
    icon: <CalendarIcon />,
    color: 'color-orange-light',
  },
  awards: {
    id: 'awards',
    route: '/console/awards',
    title: 'Awards',
    icon: <TrophyIcon />,
    color: 'color-yellow-primary',
  },
  collections: {
    id: 'collections',
    route: '/console/collections',
    title: 'Collections',
    icon: <LibraryIcon />,
    color: 'color-red-light',
  },
  countries: {
    id: 'countries',
    route: '/console/countries',
    title: 'Countries',
    icon: <MapIcon />,
    color: 'color-green-primary',
  },
  genres: {
    id: 'genres',
    route: '/console/genres',
    title: 'Genres',
    icon: <VideotapeIcon />,
    color: 'color-purple-primary',
  },
  articles: {
    id: 'articles',
    route: '/console/articles',
    title: 'Articles',
    icon: <NewspaperIcon />,
    color: 'color-green-dark',
  },
  studios: {
    id: 'studios',
    route: '/console/studios',
    title: 'Studios',
    icon: <BuildingIcon />,
    color: 'color-gray-dark',
  },
  people: {
    id: 'people',
    route: '/console/people',
    title: 'Actors / Creators',
    shortTitle: 'People',
    icon: <UserIcon />,
    color: 'color-blue-dark',
  },
  sessions: {
    id: 'sessions',
    route: '/console/sessions',
    title: 'Sessions',
    icon: <KeyRoundIcon />,
    color: 'color-purple-light',
  },
  user: {
    id: 'user',
    route: '/console/user',
    title: 'User',
    icon: <UserCogIcon />,
    color: 'color-lime-primary',
  },
};

type ConsoleMenuGroup = {
  title: string;
  itemIds: (keyof typeof consoleMenuConfig)[];
};

export const consoleMenuGroups: ConsoleMenuGroup[] = [
  {
    title: 'Films',
    itemIds: ['films', 'pendingFilms', 'upcomingFilms'],
  },
  {
    title: 'Base info',
    itemIds: ['awards', 'genres', 'collections', 'countries', 'studios', 'people'],
  },
  {
    title: 'Content',
    itemIds: ['collectionEvents', 'articles'],
  },
  {
    title: 'Account',
    itemIds: ['sessions', 'user'],
  },
];

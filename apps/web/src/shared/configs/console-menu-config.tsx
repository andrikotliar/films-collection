import { api, queryClient, router } from '~/shared/services';
import { type MenuConfigItem } from '../types';
import {
  BuildingIcon,
  CalendarClockIcon,
  CalendarIcon,
  ClapperboardIcon,
  ClockIcon,
  KeyRoundIcon,
  LibraryIcon,
  LogOutIcon,
  MapIcon,
  NewspaperIcon,
  RectangleEllipsisIcon,
  TrophyIcon,
  UserIcon,
  VideotapeIcon,
} from 'lucide-react';
import { DraftLevel } from '@films-collection/shared';

export const consoleMenuConfig = {
  people: {
    id: 'people',
    route: '/console/people',
    title: 'Actors / Creators',
    icon: <UserIcon />,
    color: 'color-blue-dark',
    type: 'link',
  },
  awards: {
    id: 'awards',
    route: '/console/awards',
    title: 'Awards',
    icon: <TrophyIcon />,
    color: 'color-yellow-primary',
    type: 'link',
  },
  collections: {
    id: 'collections',
    route: '/console/collections',
    title: 'Collections',
    icon: <LibraryIcon />,
    color: 'color-red-light',
    type: 'link',
  },
  collectionEvents: {
    id: 'collection-events',
    route: '/console/collection-events',
    title: 'Collection Events',
    icon: <CalendarIcon />,
    color: 'color-orange-light',
    type: 'link',
  },
  countries: {
    id: 'countries',
    route: '/console/countries',
    title: 'Countries',
    icon: <MapIcon />,
    color: 'color-green-primary',
    type: 'link',
  },
  films: {
    id: 'films',
    route: '/console/films',
    title: 'Films',
    icon: <ClapperboardIcon />,
    color: 'color-blue-primary',
    type: 'link',
  },
  pendingFilms: {
    id: 'pendingFilms',
    route: '/console/films',
    search: {
      draftLevels: [DraftLevel.PENDING],
      order: 'asc',
      orderKey: 'createdAt',
    },
    title: 'Pending Films',
    icon: <CalendarClockIcon />,
    color: 'color-orange-primary',
    type: 'link',
  },
  upcomingFilms: {
    id: 'upcomingFilms',
    route: '/console/films',
    title: 'Upcoming Films',
    search: {
      draftLevels: [DraftLevel.UPCOMING],
    },
    icon: <ClockIcon />,
    color: 'color-brown-light',
    type: 'link',
  },
  genres: {
    id: 'genres',
    route: '/console/genres',
    title: 'Genres',
    icon: <VideotapeIcon />,
    color: 'color-purple-primary',
    type: 'link',
  },
  pageContent: {
    id: 'page-content',
    route: '/console/page-content',
    title: 'Pages Content',
    icon: <NewspaperIcon />,
    color: 'color-green-dark',
    type: 'link',
  },
  studios: {
    id: 'studios',
    route: '/console/studios',
    title: 'Studios',
    icon: <BuildingIcon />,
    color: 'color-gray-dark',
    type: 'link',
  },
  sessions: {
    id: 'sessions',
    route: '/console/sessions',
    title: 'Sessions',
    icon: <KeyRoundIcon />,
    color: 'color-purple-light',
    type: 'link',
  },
  password: {
    id: 'password',
    route: '/console/password',
    title: 'Password',
    icon: <RectangleEllipsisIcon />,
    color: 'color-lime-primary',
    type: 'link',
  },
  logout: {
    id: 'logout',
    title: 'Log Out',
    icon: <LogOutIcon />,
    color: 'color-red-light',
    action: async () => {
      await api.auth.logout.exec();
      queryClient.removeQueries({ queryKey: [api.auth.getState.staticKey] });
      router.navigate({ to: '/login' });
    },
    type: 'button',
  },
} satisfies Record<string, MenuConfigItem>;

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
    itemIds: ['collectionEvents', 'pageContent'],
  },
  {
    title: 'Account',
    itemIds: ['sessions', 'password', 'logout'],
  },
];

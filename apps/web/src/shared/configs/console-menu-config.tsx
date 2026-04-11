import { type MenuConfigItem } from '../types';
import {
  BuildingIcon,
  CalendarIcon,
  ClapperboardIcon,
  KeyRoundIcon,
  LibraryIcon,
  ListStartIcon,
  MapIcon,
  NewspaperIcon,
  RectangleEllipsisIcon,
  TrophyIcon,
  UserIcon,
  VideotapeIcon,
} from 'lucide-react';

export const consoleMenuConfig = {
  people: {
    id: 'people',
    route: '/console/people',
    title: 'Actors / Creators',
    icon: <UserIcon />,
    color: 'color-blue-dark',
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
  collectionEvents: {
    id: 'collection-events',
    route: '/console/collection-events',
    title: 'Collection Events',
    icon: <CalendarIcon />,
    color: 'color-orange-light',
  },
  countries: {
    id: 'countries',
    route: '/console/countries',
    title: 'Countries',
    icon: <MapIcon />,
    color: 'color-green-primary',
  },
  films: {
    id: 'films',
    route: '/console/films',
    title: 'Films',
    icon: <ClapperboardIcon />,
    color: 'color-blue-primary',
  },
  genres: {
    id: 'genres',
    route: '/console/genres',
    title: 'Genres',
    icon: <VideotapeIcon />,
    color: 'color-purple-primary',
  },
  pageContent: {
    id: 'page-content',
    route: '/console/page-content',
    title: 'Pages Content',
    icon: <NewspaperIcon />,
    color: 'color-green-dark',
  },
  queue: {
    id: 'queue',
    route: '/console/queue',
    title: 'Films Queue',
    icon: <ListStartIcon />,
    color: 'color-orange-primary',
  },
  studios: {
    id: 'studios',
    route: '/console/studios',
    title: 'Studios',
    icon: <BuildingIcon />,
    color: 'color-gray-dark',
  },
  sessions: {
    id: 'sessions',
    route: '/console/sessions',
    title: 'Sessions',
    icon: <KeyRoundIcon />,
    color: 'color-purple-light',
  },
  password: {
    id: 'password',
    route: '/console/password',
    title: 'Password',
    icon: <RectangleEllipsisIcon />,
    color: 'color-lime-primary',
  },
} satisfies Record<string, MenuConfigItem>;

type ConsoleMenuGroup = {
  title: string;
  itemIds: (keyof typeof consoleMenuConfig)[];
};

export const consoleMenuGroups: ConsoleMenuGroup[] = [
  {
    title: 'Films',
    itemIds: ['films', 'queue'],
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
    itemIds: ['sessions', 'password'],
  },
];

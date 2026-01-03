import { type MenuConfigItem } from '../types';
import {
  BuildingIcon,
  CalendarIcon,
  CalendarSyncIcon,
  ClapperboardIcon,
  LibraryIcon,
  MapIcon,
  NewspaperIcon,
  TrophyIcon,
  UserIcon,
  VideotapeIcon,
} from 'lucide-react';

export const consoleMenuConfig: MenuConfigItem[] = [
  {
    id: 'pending-films',
    route: '/console/pending-films',
    title: 'Pending Films',
    icon: <CalendarSyncIcon />,
  },
  {
    id: 'films',
    route: '/console/films',
    title: 'Films',
    icon: <ClapperboardIcon />,
  },
  {
    id: 'genres',
    route: '/console/genres',
    title: 'Genres',
    icon: <VideotapeIcon />,
  },
  {
    id: 'countries',
    route: '/console/countries',
    title: 'Countries',
    icon: <MapIcon />,
  },
  {
    id: 'studios',
    route: '/console/studios',
    title: 'Studios',
    icon: <BuildingIcon />,
  },
  {
    id: 'collections',
    route: '/console/collections',
    title: 'Collections',
    icon: <LibraryIcon />,
  },
  {
    id: 'awards',
    route: '/console/awards',
    title: 'Awards',
    icon: <TrophyIcon />,
  },
  {
    id: 'people',
    route: '/console/people',
    title: 'Actors and Creators',
    icon: <UserIcon />,
  },
  {
    id: 'collection-events',
    route: '/console/collection-events',
    title: 'Collection Events',
    icon: <CalendarIcon />,
  },
  {
    id: 'page-content',
    route: '/console/page-content',
    title: 'Pages Content',
    icon: <NewspaperIcon />,
  },
];

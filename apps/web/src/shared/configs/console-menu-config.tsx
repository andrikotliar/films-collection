import { type MenuConfigItem } from '../types';
import {
  CalendarIcon,
  CalendarSyncIcon,
  ClapperboardIcon,
  Grid2X2PlusIcon,
  NewspaperIcon,
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
    icon: <Grid2X2PlusIcon />,
  },
  {
    id: 'countries',
    route: '/console/countries',
    title: 'Countries',
    icon: <Grid2X2PlusIcon />,
  },
  {
    id: 'studios',
    route: '/console/studios',
    title: 'Studios',
    icon: <Grid2X2PlusIcon />,
  },
  {
    id: 'collections',
    route: '/console/collections',
    title: 'Collections',
    icon: <Grid2X2PlusIcon />,
  },
  {
    id: 'awards',
    route: '/console/awards',
    title: 'Awards',
    icon: <Grid2X2PlusIcon />,
  },
  {
    id: 'people',
    route: '/console/people',
    title: 'Actors and Creators',
    icon: <Grid2X2PlusIcon />,
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

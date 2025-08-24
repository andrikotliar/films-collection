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
    id: 'pending',
    route: '/console/pending',
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
    id: 'general',
    route: '/console/general',
    title: 'General',
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

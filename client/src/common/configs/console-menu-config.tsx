import { MenuConfigItem } from '../types';
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
    title: 'Pending films',
    icon: <CalendarSyncIcon />,
  },
  {
    id: 'manage',
    route: '/console/manage',
    title: 'Manage films',
    icon: <ClapperboardIcon />,
  },
  {
    id: 'general',
    route: '/console/general',
    title: 'General data',
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

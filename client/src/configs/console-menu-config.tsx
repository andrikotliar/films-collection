import { MenuConfigItem } from '@/types';
import {
  CalendarIcon,
  CalendarSyncIcon,
  ClapperboardIcon,
  Grid2X2PlusIcon,
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
    id: 'additional',
    route: '/console/additional',
    title: 'Additional data',
    icon: <Grid2X2PlusIcon />,
  },
  {
    id: 'collection-events',
    route: '/console/collection-events',
    title: 'Collection Events',
    icon: <CalendarIcon />,
  },
];

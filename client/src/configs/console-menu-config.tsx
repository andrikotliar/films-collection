import { MenuConfigItem } from '@/types';
import {
  CalendarSyncIcon,
  ClapperboardIcon,
  Grid2X2PlusIcon,
  TextSearchIcon,
} from 'lucide-react';

export const consoleMenuConfig: MenuConfigItem[] = [
  {
    id: 'pending',
    route: '/console/pending',
    title: 'Pending films',
    icon: <CalendarSyncIcon />,
  },
  {
    id: 'missing',
    route: '/console/missing',
    title: 'Missing fields',
    icon: <TextSearchIcon />,
  },
  {
    id: 'create',
    route: '/console/create',
    title: 'Create film',
    icon: <ClapperboardIcon />,
  },
  {
    id: 'additional',
    route: '/console/additional',
    title: 'Additional data',
    icon: <Grid2X2PlusIcon />,
  },
];

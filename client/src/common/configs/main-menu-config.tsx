import { MenuConfigItem } from '../types';
import {
  FolderCogIcon,
  InfoIcon,
  LibraryBigIcon,
  PieChartIcon,
} from 'lucide-react';

export const mainMenu: MenuConfigItem[] = [
  {
    id: 'root',
    title: 'Films',
    route: '/',
    icon: <LibraryBigIcon />,
  },
  {
    id: 'stats',
    title: 'Statistic',
    route: '/statistic',
    icon: <PieChartIcon />,
  },
  {
    id: 'about',
    title: 'About',
    route: '/about',
    icon: <InfoIcon />,
  },
  {
    id: 'console',
    title: 'Console',
    route: '/console/pending',
    icon: <FolderCogIcon />,
  },
];

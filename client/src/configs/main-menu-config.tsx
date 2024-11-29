import { MenuConfigItem } from '@/types';
import {
  FolderCogIcon,
  InfoIcon,
  LibraryBigIcon,
  PieChartIcon,
} from 'lucide-react';

const mainMenu: MenuConfigItem[] = [
  {
    title: 'Films',
    route: '/',
    icon: <LibraryBigIcon />,
  },
  {
    title: 'Statistic',
    route: '/statistic',
    icon: <PieChartIcon />,
  },
  {
    title: 'About',
    route: '/about',
    icon: <InfoIcon />,
  },
  {
    title: 'Console',
    route: '/console',
    icon: <FolderCogIcon />,
  },
];

export { mainMenu };

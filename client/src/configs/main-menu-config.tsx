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
    route: '/stats',
    icon: <PieChartIcon />,
  },
  {
    title: 'About',
    route: '/about',
    icon: <InfoIcon />,
  },
  {
    title: 'Manager',
    route: '/manager',
    icon: <FolderCogIcon />,
  },
];

export { mainMenu };

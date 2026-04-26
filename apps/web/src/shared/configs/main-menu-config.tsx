import type { MenuConfigItem } from '../types';
import { FolderCogIcon, HomeIcon, InfoIcon, LibraryBigIcon } from 'lucide-react';

export const mainMenu: MenuConfigItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    route: '/',
    icon: <HomeIcon />,
  },
  {
    id: 'films',
    title: 'Films',
    route: '/films',
    icon: <LibraryBigIcon />,
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
    route: '/console',
    icon: <FolderCogIcon />,
  },
];

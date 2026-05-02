import type { MenuConfigItem } from '../types';
import { FolderCogIcon, InfoIcon, LibraryBigIcon } from 'lucide-react';

export const mainMenu: MenuConfigItem[] = [
  {
    id: 'films',
    title: 'Films',
    route: '/',
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

import type { MenuConfigItem } from '../types';
import { InfoIcon, LibraryBigIcon, SettingsIcon } from 'lucide-react';

export const mainMenuConfig: MenuConfigItem[] = [
  {
    id: 'root',
    title: 'Films',
    route: '/',
    icon: <LibraryBigIcon />,
    type: 'link',
  },
  {
    id: 'about',
    title: 'About',
    route: '/about',
    icon: <InfoIcon />,
    type: 'link',
  },
  {
    id: 'console',
    title: 'Console',
    route: '/console',
    icon: <SettingsIcon />,
    type: 'link',
  },
];

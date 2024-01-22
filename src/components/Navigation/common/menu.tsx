import { FolderIcon, HomeIcon, InfoIcon, StatsIcon } from '@/assets/icons';

const menu = [
  {
    id: 'home',
    title: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    id: 'stats',
    title: 'Statistic',
    link: '/stats',
    icon: <StatsIcon />,
    isDisabled: true,
  },
  {
    id: 'admin',
    title: 'Create film',
    link: '/create',
    icon: <FolderIcon />,
    isDisabled: true,
  },
  {
    id: 'about',
    title: 'About',
    link: '/about',
    icon: <InfoIcon />,
  },
];

export { menu };

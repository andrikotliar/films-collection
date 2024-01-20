import { PlayIcon } from '@/assets/icons';

const menu = [
  {
    id: 'home',
    title: 'Home',
    link: '/',
    icon: <PlayIcon />,
  },
  {
    id: 'about',
    title: 'About',
    link: '/about',
    icon: <PlayIcon />,
  },
  {
    id: 'stats',
    title: 'Statistic',
    link: '/stats',
    icon: <PlayIcon />,
    isDisabled: true,
  },
  {
    id: 'admin',
    title: 'Create film',
    link: '/create',
    icon: <PlayIcon />,
    isDisabled: true,
  },
];

export { menu };

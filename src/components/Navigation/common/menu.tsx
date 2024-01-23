import { FolderPlus, Home, Info, PieChart } from 'lucide-react';

const menu = [
  {
    id: 'home',
    title: 'Home',
    link: '/',
    icon: <Home size={20} />,
  },
  {
    id: 'stats',
    title: 'Statistic',
    link: '/stats',
    icon: <PieChart size={20} />,
    isDisabled: true,
  },
  {
    id: 'admin',
    title: 'Create film',
    link: '/create',
    icon: <FolderPlus size={20} />,
    isDisabled: true,
  },
  {
    id: 'about',
    title: 'About',
    link: '/about',
    icon: <Info size={20} />,
  },
];

export { menu };

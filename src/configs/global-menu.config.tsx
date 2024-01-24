import { FolderPlus, Home, Info, LogIn, PieChart } from 'lucide-react';

const globalMenu = [
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
  },
  {
    id: 'about',
    title: 'About',
    link: '/about',
    icon: <Info size={20} />,
  },
  {
    id: 'login',
    title: 'Login',
    link: '/login',
    icon: <LogIn size={20} />,
  },
];

export { globalMenu };

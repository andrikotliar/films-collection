import type { MenuConfigItem } from '~/common';
import { Link } from '@tanstack/react-router';
import {
  Building2Icon,
  ChevronRightIcon,
  EarthIcon,
  MonitorPlayIcon,
  Rows3Icon,
  TrophyIcon,
  UsersIcon,
} from 'lucide-react';

const generalPagesConfig: MenuConfigItem[] = [
  {
    id: 'genres',
    title: 'Genres',
    icon: <MonitorPlayIcon />,
    route: '/console/general/genres',
  },
  {
    id: 'countries',
    title: 'Countries',
    icon: <EarthIcon />,
    route: '/console/general/countries',
  },
  {
    id: 'studios',
    title: 'Studios',
    icon: <Building2Icon />,
    route: '/console/general/studios',
  },
  {
    id: 'collections',
    title: 'Collections',
    icon: <Rows3Icon />,
    route: '/console/general/collections',
  },
  {
    id: 'awards',
    title: 'Awards',
    icon: <TrophyIcon />,
    route: '/console/general/awards',
  },
  {
    id: 'people',
    title: 'People',
    icon: <UsersIcon />,
    route: '/console/general/people',
  },
];

export const GeneralPagesMenu = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {generalPagesConfig.map((item) => (
        <Link
          to={item.route}
          key={item.id}
          className="flex gap-2 bg-white p-5 rounded-md border border-slate-300 hover:border-slate-500 hover:text-sky-700 transition"
        >
          <div className="shrink-0">{item.icon}</div>
          <div>{item.title}</div>
          <ChevronRightIcon className="ml-auto" />
        </Link>
      ))}
    </div>
  );
};

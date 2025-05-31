import styles from './general-pages-menu.module.css';
import { MenuConfigItem } from '@/types';
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
    id: 'people',
    title: 'People',
    icon: <UsersIcon />,
    route: '/console/general/people',
  },
];

export const GeneralPagesMenu = () => {
  return (
    <div className={styles.wrapper}>
      {generalPagesConfig.map((item) => (
        <Link to={item.route} key={item.id} className={styles.link}>
          {item.icon}
          <div>{item.title}</div>
          <ChevronRightIcon className={styles.chevronIcon} />
        </Link>
      ))}
    </div>
  );
};

import styles from './styles.module.css';
import type { MenuConfigItem } from '~/lib';
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
    <div className={styles.general_pages_menu}>
      {generalPagesConfig.map((item) => (
        <Link to={item.route} key={item.id} className={styles.link}>
          <div className={styles.icon}>{item.icon}</div>
          <div>{item.title}</div>
          <ChevronRightIcon className={styles.chevron_icon} />
        </Link>
      ))}
    </div>
  );
};

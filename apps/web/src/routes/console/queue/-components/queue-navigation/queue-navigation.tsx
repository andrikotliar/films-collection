import { Link, useLocation } from '@tanstack/react-router';
import styles from './queue-navigation.module.css';
import clsx from 'clsx';
import { CalendarClockIcon, ClockIcon, TvIcon } from 'lucide-react';

const navigation = [
  {
    link: '/console/queue',
    title: 'Watched films',
    icon: <TvIcon size={20} />,
  },
  {
    link: '/console/queue/planned',
    title: 'Planned films',
    icon: <ClockIcon size={20} />,
  },
  {
    link: '/console/queue/upcoming',
    title: 'Upcoming films',
    icon: <CalendarClockIcon size={20} />,
  },
];

export const QueueNavigation = () => {
  const location = useLocation();
  return (
    <div className={styles.navigation}>
      {navigation.map((item) => (
        <Link
          className={clsx(styles.link, location.pathname === item.link && styles.active_link)}
          key={item.link}
          to={item.link}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

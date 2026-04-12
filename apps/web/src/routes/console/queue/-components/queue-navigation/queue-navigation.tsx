import { Link, useLocation } from '@tanstack/react-router';
import styles from './queue-navigation.module.css';
import clsx from 'clsx';

const navigation = [
  {
    link: '/console/queue',
    title: 'Watched films',
  },
  {
    link: '/console/queue/planned',
    title: 'Planned films',
  },
  {
    link: '/console/queue/upcoming',
    title: 'Upcoming films',
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
          {item.title}
        </Link>
      ))}
    </div>
  );
};

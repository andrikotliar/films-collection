import { CSSProperties, FC, ReactNode } from 'react';
import styles from './StatisticItem.module.css';
import { Link, LinkProps } from '@tanstack/react-router';
import { FileRoutesByTo } from '@/routeTree.gen';

type StatisticItemProps = {
  route: keyof FileRoutesByTo;
  searchParams: LinkProps['search'];
  icon: ReactNode;
  value: number | string;
  color: 'green' | 'yellow' | 'purple';
  title?: string;
};

const colorVar = {
  green: 'green-success',
  yellow: 'yellow-saturated',
  purple: 'purple-dark',
};

export const StatisticItem: FC<StatisticItemProps> = ({
  icon,
  value,
  color,
  title,
  route,
  searchParams,
}) => {
  const style = {
    '--stat-item-color': `var(--${colorVar[color]})`,
  } as CSSProperties;

  return (
    <Link
      to={route}
      search={searchParams}
      className={styles.statisticItem}
      style={style}
      title={title}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.value}>{value}</span>
    </Link>
  );
};

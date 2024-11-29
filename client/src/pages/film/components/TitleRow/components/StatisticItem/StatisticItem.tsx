import { CSSProperties, FC, ReactNode } from 'react';
import styles from './StatisticItem.module.css';
import { Link } from '@tanstack/react-router';

type StatisticItemProps = {
  linkPath: string;
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

const StatisticItem: FC<StatisticItemProps> = ({
  icon,
  value,
  color,
  title,
  linkPath,
}) => {
  const style = {
    '--stat-item-color': `var(--${colorVar[color]})`,
  } as CSSProperties;

  return (
    <Link
      to={linkPath}
      className={styles.statisticItem}
      style={style}
      title={title}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.value}>{value}</span>
    </Link>
  );
};

export { StatisticItem };

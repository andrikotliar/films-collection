import clsx from 'clsx';
import styles from './status.module.css';
import { type StatusColor } from '~/shared';

export type StatusProps = {
  color: StatusColor;
  title: string;
};

export const Status = ({ color, title }: StatusProps) => {
  return <div className={clsx(styles.status, styles[color])}>{title}</div>;
};

import clsx from 'clsx';
import styles from './styles.module.css';
import { type StatusColor } from '~/shared';

export type Props = {
  color: StatusColor;
  title: string;
};

export const Status = ({ color, title }: Props) => {
  return <div className={clsx(styles.status, styles[color])}>{title}</div>;
};

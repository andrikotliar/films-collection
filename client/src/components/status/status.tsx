import classNames from 'classnames';
import styles from './status.module.css';
import { StatusColor } from '@/types';

export type StatusProps = {
  color: StatusColor;
  title: string;
};

export const Status = ({ color, title }: StatusProps) => {
  return (
    <div className={classNames(styles.status, styles[color])}>{title}</div>
  );
};

import classNames from 'classnames';
import styles from './status.module.css';
import { FC } from 'react';
import { StatusColor } from '@/types';

export type StatusProps = {
  color: StatusColor;
  title: string;
};

export const Status: FC<StatusProps> = ({ title, color }) => {
  return (
    <div className={classNames(styles.status, styles[color])}>{title}</div>
  );
};

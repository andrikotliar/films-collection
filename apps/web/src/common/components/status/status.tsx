import classNames from 'classnames';
import styles from './styles.module.css';
import { StatusColor } from '~/common';

export type StatusProps = {
  color: StatusColor;
  title: string;
};

export const Status = ({ color, title }: StatusProps) => {
  return <div className={classNames(styles.status, styles[color])}>{title}</div>;
};

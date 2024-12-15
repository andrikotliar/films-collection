import classNames from 'classnames';
import styles from './Status.module.css';
import { FC, PropsWithChildren } from 'react';

export type StatusProps = {
  color: 'gray' | 'red' | 'yellow';
};

export const Status: FC<PropsWithChildren<StatusProps>> = ({
  children,
  color,
}) => {
  return (
    <div className={classNames(styles.status, styles[color])}>{children}</div>
  );
};

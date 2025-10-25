import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import type { PropsWithClassName } from '~/common';

type Props = PropsWithClassName<{
  title: string;
}>;

export const DashboardSection = ({ title, children, className }: PropsWithChildren<Props>) => {
  return (
    <div className={classNames(styles.section, className)}>
      <div className={styles.header}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

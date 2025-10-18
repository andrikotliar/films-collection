import type { ReactNode } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

type DashboardSectionProps = {
  title: string;
  children?: ReactNode;
  className?: string;
};

export const DashboardSection = ({ title, children, className }: DashboardSectionProps) => {
  return (
    <div className={classNames(styles.section, className)}>
      <div className={styles.header}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

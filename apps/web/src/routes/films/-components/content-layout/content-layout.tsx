import styles from './styles.module.css';
import { ReactNode } from 'react';

type ContentLayoutProps = {
  children?: ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div className={styles.content}>{children}</div>;
};

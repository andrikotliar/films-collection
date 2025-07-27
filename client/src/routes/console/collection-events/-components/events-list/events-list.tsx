import type { ReactNode } from 'react';
import styles from './events-list.module.css';

type EventsListProps = {
  children: ReactNode;
};

export const EventsList = ({ children }: EventsListProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

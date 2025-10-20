import styles from './styles.module.css';
import type { PropsWithChildren } from 'react';

type EventsListProps = PropsWithChildren;

export const EventsList = ({ children }: EventsListProps) => {
  return <div className={styles.events_list}>{children}</div>;
};

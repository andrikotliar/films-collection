import styles from "./events-list.module.css";
import type { PropsWithChildren } from 'react';

export const EventsList = ({ children }: PropsWithChildren) => {
  return <div className={styles.events_list}>{children}</div>;
};

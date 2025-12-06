import styles from "./placeholder.module.css";
import { type PropsWithChildren } from 'react';

export const Placeholder = ({ children }: PropsWithChildren) => {
  return <div className={styles.placeholder}>{children}</div>;
};

import styles from "./content-layout.module.css";
import { type PropsWithChildren } from 'react';

export const ContentLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>;
};

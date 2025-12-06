import { type PropsWithChildren } from 'react';
import styles from "./title.module.css";

export const Title = ({ children }: PropsWithChildren) => {
  return <h1 className={styles.title}>{children}</h1>;
};

import styles from "./messages-wrapper.module.css";
import { type PropsWithChildren } from 'react';

export const MessagesWrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.wrapper}>{children}</div>;
};

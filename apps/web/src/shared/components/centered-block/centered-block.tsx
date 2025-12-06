import type { PropsWithChildren } from 'react';
import styles from "./centered-block.module.css";

export const CenteredBlock = ({ children }: PropsWithChildren) => {
  return <div className={styles.centered_block}>{children}</div>;
};

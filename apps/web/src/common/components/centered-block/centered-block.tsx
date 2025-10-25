import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const CenteredBlock = ({ children }: PropsWithChildren) => {
  return <div className={styles.centeredBlock}>{children}</div>;
};

import type { ReactNode } from 'react';
import styles from './styles.module.css';

type CenteredBlockProps = {
  children?: ReactNode;
};

export const CenteredBlock = ({ children }: CenteredBlockProps) => {
  return <div className={styles.centeredBlock}>{children}</div>;
};

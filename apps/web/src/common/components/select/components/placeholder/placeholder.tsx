import styles from './placeholder.module.css';
import { ReactNode } from 'react';

type PlaceholderProps = {
  children?: ReactNode;
};

export const Placeholder = ({ children }: PlaceholderProps) => {
  return <div className={styles.placeholder}>{children}</div>;
};

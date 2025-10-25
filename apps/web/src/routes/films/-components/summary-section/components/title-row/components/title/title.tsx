import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const Title = ({ children }: PropsWithChildren) => {
  return <h1 className={styles.title}>{children}</h1>;
};

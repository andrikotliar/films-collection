import { FC, PropsWithChildren } from 'react';
import styles from './Column.module.css';

const Column: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.column}>{children}</div>;
};

export { Column };

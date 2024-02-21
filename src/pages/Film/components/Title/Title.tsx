import styles from './Title.module.css';
import { FC, PropsWithChildren } from 'react';

const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export { Title };

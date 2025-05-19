import { FC, PropsWithChildren } from 'react';

import styles from './title.module.css';

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

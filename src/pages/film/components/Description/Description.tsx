import { FC, PropsWithChildren } from 'react';

import styles from './Description.module.css';

const Description: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.description}>{children}</div>;
};

export { Description };

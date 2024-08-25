import { FC, PropsWithChildren } from 'react';
import styles from './Wrapper.module.css';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export { Wrapper };

import type { PropsWithChildren } from 'react';
import styles from './tab-wrapper.module.css';

export const TabWrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.tab_wrapper}>{children}</div>;
};

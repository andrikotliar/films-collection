import { ReactNode } from 'react';
import styles from './console-content.module.css';

type ConsoleContentProps = {
  children?: ReactNode;
};

export const ConsoleContent = ({ children }: ConsoleContentProps) => {
  return <div className={styles.contentLayout}>{children}</div>;
};

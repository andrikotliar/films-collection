import styles from './scrollable-line.module.css';
import type { PropsWithChildren } from 'react';

type ScrollableLineProps = PropsWithChildren;

export const ScrollableLine = ({ children }: ScrollableLineProps) => {
  return <div className={styles.scrollable_line}>{children}</div>;
};

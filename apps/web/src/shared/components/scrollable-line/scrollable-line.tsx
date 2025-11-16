import styles from './styles.module.css';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const ScrollableLine = ({ children }: Props) => {
  return <div className={styles.scrollable_line}>{children}</div>;
};

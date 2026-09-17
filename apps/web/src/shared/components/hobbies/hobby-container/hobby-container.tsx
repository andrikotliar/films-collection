import type { PropsWithChildren } from 'react';
import styles from './hobby-container.module.css';

type HobbyContainerProps = PropsWithChildren;

export const HobbyContainer = ({ children }: HobbyContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

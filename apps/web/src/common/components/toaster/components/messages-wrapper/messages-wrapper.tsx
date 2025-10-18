import styles from './styles.module.css';
import { type ReactNode } from 'react';

type MessagesWrapperProps = {
  children?: ReactNode;
};

export const MessagesWrapper = ({ children }: MessagesWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

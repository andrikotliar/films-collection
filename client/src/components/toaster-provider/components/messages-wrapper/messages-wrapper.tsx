import styles from './messages-wrapper.module.css';
import { ReactNode } from 'react';

type MessagesWrapperProps = {
  children?: ReactNode;
};

export const MessagesWrapper = ({ children }: MessagesWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

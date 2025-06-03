import styles from './messages-wrapper.module.css';
import { FC, PropsWithChildren } from 'react';

type MessagesWrapperProps = PropsWithChildren;

export const MessagesWrapper: FC<MessagesWrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

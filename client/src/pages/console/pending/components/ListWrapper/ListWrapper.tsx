import styles from './ListWrapper.module.css';
import { FC, PropsWithChildren } from 'react';

type ListWrapperProps = PropsWithChildren;

export const ListWrapper: FC<ListWrapperProps> = ({ children }) => {
  return <div className={styles.listWrapper}>{children}</div>;
};

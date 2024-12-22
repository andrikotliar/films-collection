import { Loader } from '@/components';
import styles from './ListWrapper.module.css';
import { FC, PropsWithChildren } from 'react';

type ListWrapperProps = PropsWithChildren<{
  isLoading: boolean;
}>;

export const ListWrapper: FC<ListWrapperProps> = ({ children, isLoading }) => {
  if (isLoading) {
    return <Loader iconClassName={styles.loaderIcon} />;
  }

  return <div className={styles.listWrapper}>{children}</div>;
};

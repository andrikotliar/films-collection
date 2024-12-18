import styles from './ScrollableWrapper.module.css';
import { PropsWithClassName } from '@/types';
import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

export const ScrollableWrapper: FC<PropsWithChildren<PropsWithClassName>> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.customScroll, className)}>{children}</div>
  );
};

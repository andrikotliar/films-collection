import styles from './ScrollableWrapper.module.css';
import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

type ScrollableWrapperProps = {
  className?: string;
};

export const ScrollableWrapper: FC<
  PropsWithChildren<ScrollableWrapperProps>
> = ({ children, className }) => {
  return (
    <div className={classNames(styles.customScroll, className)}>{children}</div>
  );
};

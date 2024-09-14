import styles from './Scrollable.module.css';
import { PropsWithClassName } from '@/types';
import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

const Scrollable: FC<PropsWithChildren<PropsWithClassName>> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.customScroll, className)}>{children}</div>
  );
};

export { Scrollable };

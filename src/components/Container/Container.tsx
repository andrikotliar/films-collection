import { PropsWithClassName } from '@/common/types';
import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

const Container: FC<PropsWithChildren<PropsWithClassName>> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};

export { Container };

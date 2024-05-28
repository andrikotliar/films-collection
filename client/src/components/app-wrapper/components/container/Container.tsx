import { PropsWithClassName } from '@/common/types';
import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

const Container: FC<PropsWithChildren<PropsWithClassName>> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};

export { Container };

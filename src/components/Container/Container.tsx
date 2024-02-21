import { PropsWithClassName } from '@/common';
import { FC, PropsWithChildren } from 'react';
import classes from './styles.module.css';
import classNames from 'classnames';

const Container: FC<PropsWithChildren<PropsWithClassName>> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(classes.container, className)}>{children}</div>
  );
};

export { Container };

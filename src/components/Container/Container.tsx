import classes from './Container.module.css';
import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '@/common';

const Container: FC<
  PropsWithChildren<PropsWithClassName>
> = ({ className, children }) => {
  return (
    <div
      className={classNames(classes.container, className)}
    >
      {children}
    </div>
  );
};

export { Container };

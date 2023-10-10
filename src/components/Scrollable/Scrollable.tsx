import classes from './Scrollable.module.css';
import { PropsWithClassName } from '@/common';
import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

const Scrollable: FC<
  PropsWithChildren<PropsWithClassName>
> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        classes.customScroll,
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Scrollable };

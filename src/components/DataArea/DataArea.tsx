import { FC, PropsWithChildren } from 'react';
import classes from './DataArea.module.css';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  className?: string;
}>;

const DataArea: FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(classes.dataArea, className)}>{children}</div>
  );
};

export { DataArea };

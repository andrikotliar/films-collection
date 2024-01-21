import { FC, PropsWithChildren } from 'react';
import classes from './DataGrid.module.css';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  className?: string;
}>;

const DataGrid: FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(classes.dataGrid, className)}>{children}</div>
  );
};

export { DataGrid };

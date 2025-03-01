import { FC, PropsWithChildren } from 'react';
import styles from './DataGrid.module.css';
import classNames from 'classnames';

type DataGridProps = PropsWithChildren<{
  className?: string;
}>;

export const DataGrid: FC<DataGridProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.dataGrid, className)}>{children}</div>
  );
};

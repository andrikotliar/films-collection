import { FC, PropsWithChildren } from 'react';
import styles from './DataGrid.module.css';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  className?: string;
}>;

const DataGrid: FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.dataGrid, className)}>{children}</div>
  );
};

export { DataGrid };

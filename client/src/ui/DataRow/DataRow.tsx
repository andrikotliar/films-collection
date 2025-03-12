import { FC, PropsWithChildren } from 'react';
import styles from './DataRow.module.css';
import classNames from 'classnames';

type DataRowProps = PropsWithChildren<{ className?: string }>;

export const DataRow: FC<DataRowProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.dataRow, className)}>{children}</div>
  );
};

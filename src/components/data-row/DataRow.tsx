import { FC, PropsWithChildren } from 'react';
import styles from './DataRow.module.css';
import classNames from 'classnames';

type DataRowProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

const DataRow: FC<DataRowProps> = ({ children, title, className }) => {
  return (
    <div className={classNames(styles.dataRow, className)}>
      <span className={styles.title}>{title}</span>
      {children}
    </div>
  );
};

export { DataRow };

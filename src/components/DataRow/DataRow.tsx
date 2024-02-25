import { FC, PropsWithChildren } from 'react';
import styles from './DataRow.module.css';
import classNames from 'classnames';

enum RowDirection {
  COLUMN = 'column',
  ROW = 'row',
}

type Props = PropsWithChildren<{
  title: string;
  className?: string;
  direction?: RowDirection;
}>;

const DataRow: FC<Props> = ({
  children,
  title,
  className,
  direction = RowDirection.COLUMN,
}) => {
  return (
    <div className={classNames(styles.dataRow, className, styles[direction])}>
      <span className={styles.title}>{title}</span>
      {children}
    </div>
  );
};

export { DataRow, RowDirection };

import { CSSProperties, FC, PropsWithChildren } from 'react';
import classes from './DataRow.module.css';
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
    <div
      className={classNames(classes.dataRow, className)}
      style={
        {
          '--direction': direction,
        } as CSSProperties
      }
    >
      <span className={classes.title}>{title}</span>
      {children}
    </div>
  );
};

export { DataRow };
